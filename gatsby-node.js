exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type ContentfulAsset implements Node {
            fixed: ContentfulFixed
            fluid: ContentfulFluid
        }
    
        type ContentfulBookDescription {
            raw: String!
        }

        type MarkdownRemark implements Node @childOf(types: ["contentfulBookReviewQuoteTextNode"]) {
            html: String!
        }

        type contentfulBookReviewQuoteTextNode implements Node @childOf(types: ["ContentfulBookReview"]) {
            quote: String
            childMarkdownRemark: MarkdownRemark
        }

        type ContentfulBookReview implements Node {
            stars: Int
            quote: contentfulBookReviewQuoteTextNode! @link(by: "id", from: "quote___NODE")
        }

        type ContentfulBook implements Node {
            title: String!
            shortDescription: String!
            description: ContentfulBookDescription!
            releaseDate: Date! @dateFormat
            coverImage: ContentfulAsset @link(by: "id", from: "coverImage___NODE")
            reviews: [ContentfulBookReview!]
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
        }
    `)

    data.allContentfulBook.nodes.forEach(({ id, contentful_id }) => {
        actions.createPage({
            path: `/books/${contentful_id}`,
            component: require.resolve(`./src/templates/Book.tsx`),
            context: { id },
        })
    })
}
