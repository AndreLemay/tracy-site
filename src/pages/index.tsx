import React from "react"
//import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

const IndexPage = (/*{ data }*/) => (
    <Layout>
        <SEO title="Home" />
    </Layout>
)

export default IndexPage

// export const query = graphql`
//     query {
//         allFile(
//             filter: {
//                 extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
//                 sourceInstanceName: { eq: "images" }
//             }
//         ) {
//             edges {
//                 node {
//                     childImageSharp {
//                         fluid(maxWidth: 1920, quality: 80) {
//                             ...GatsbyImageSharpFluid
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `
