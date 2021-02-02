import { graphql, useStaticQuery } from "gatsby"
import Image from "./Image"
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
            <Image style={{ maxWidth: 1200, height: 250, margin: "auto" }} fluid={banner.childImageSharp.fluid} />
            <Navbar />
        </>
    )
}
