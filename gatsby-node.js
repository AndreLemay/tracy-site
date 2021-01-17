exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type ContentfulBookDescription {
            raw: String!
        }

        type MarkdownRemark implements Node @childOf(types: ["contentfulBookReviewQuoteTextNode"]) {
            html: String!
        }

        type contentfulBookReviewQuoteTextNode implements Node @dontInfer @childOf(types: ["ContentfulBookReview"]) {
            quote: String
            childMarkdownRemark: MarkdownRemark
        }

        type ContentfulBookReview implements Node @dontInfer {
            stars: Int
            quote: contentfulBookReviewQuoteTextNode!
        }

        type ContentfulBook implements Node @dontInfer {
            title: String!
            description: ContentfulBookDescription
            coverImage: ContentfulAsset
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
