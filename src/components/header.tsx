import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Navbar from "./Navbar"
import React from "react"

export default () => {
    const { banner } = useStaticQuery(graphql`
        query {
            banner: file(relativePath: { eq: "main-banner.png" }) {
                childImageSharp {
                    fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    return (
        <BackgroundImage style={{ width: 800, height: 300 }} fluid={banner.childImageSharp.fluid}>
            <Navbar />
        </BackgroundImage>
    )
}
