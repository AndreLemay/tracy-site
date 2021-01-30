/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
    const headComponents = getHeadComponents()
    const order = ["title", "base", "meta", "link", "noscript", "script", "style"]
    const sortedHeadComponents = headComponents
        .slice(0)
        .flat()
        .sort((x, y) => {
            return order.indexOf(x.type) - order.indexOf(y.type)
        })

    replaceHeadComponents(sortedHeadComponents)
}
