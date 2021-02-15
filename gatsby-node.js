exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type ContentfulAsset implements Node {
            fixed: ContentfulFixed
            fluid: ContentfulFluid
        }
    
        type ContentfulBook implements Node {
            reviews: [ContentfulBookReview!]
            coverImage: ContentfulAsset @link(by: "id", from: "coverImage___NODE")
        }
    `)
}

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            allContentfulBook {
                nodes {
                    id
                    contentful_id
                }
            }
            allContentfulBlogPost ${
                process.env.NODE_END !== "development" ? "(filter: { isTesting: { eq: false } })" : ""
            }{
                nodes {
                    id
                    contentful_id
                }
            }
        }
    `)

    data.allContentfulBook.nodes.forEach(({ id, contentful_id }) => {
        actions.createPage({
            path: `/books/${contentful_id}`,
            component: require.resolve(`./src/templates/Book.tsx`),
            context: { id },
        })
    })

    data.allContentfulBlogPost.nodes.forEach(({ id, contentful_id }) => {
        actions.createPage({
            path: `/blog/${contentful_id}`,
            component: require.resolve(`./src/templates/BlogPost.tsx`),
            context: { id },
        })
    })
}
