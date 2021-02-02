import React from "react"
import Img, { FixedObject, FluidObject, GatsbyImageOptionalProps } from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

//have to basically recreate this because typescript will complain about fluid/fixed not existing on the type if I use GatsbyImageProps
interface ImageProps extends GatsbyImageOptionalProps {
    fluid?: FluidObject | FluidObject[]
    fixed?: FixedObject | FixedObject[]
}

interface StaticQueryResult {
    placeholderImage: {
        childImageSharp: {
            fluid: FluidObject
        }
    }
}

const Image = ({ fluid, fixed, ...props }: ImageProps) => {
    const { placeholderImage } = useStaticQuery<StaticQueryResult>(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "unknown-image.png" }, sourceInstanceName: { eq: "images" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    //if passed in props don't define height and objectFit, give them defaults that will actually make the image stay in its container
    props = {
        ...props,
        style: {
            height: "100%",
            ...props.style,
        },
        imgStyle: {
            objectFit: "contain",
            ...props.imgStyle,
        },
    }

    if (fluid) return <Img fluid={fluid} {...props} />
    else if (fixed) return <Img fixed={fixed} {...props} />
    else return <Img fluid={placeholderImage.childImageSharp.fluid} {...props} />
}

export default Image
