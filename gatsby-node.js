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
