import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Navbar from "./Navbar"
import React from "react"

export default () => {
    const { banner } = useStaticQuery(graphql`
        query {
            banner: file(relativePath: { eq: "main-banner.png" }) {
                childImageSharp {
                    fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    return (
        <>
            <Img style={{ maxWidth: 1200, height: 250, margin: "auto" }} fluid={banner.childImageSharp.fluid} />
            <Navbar />
        </>
    )
}
