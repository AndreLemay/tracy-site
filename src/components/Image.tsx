import React from "react"
import Img, { FixedObject, FluidObject, GatsbyImageOptionalProps } from "gatsby-image"

//have to basically recreate this because typescript will complain about fluid/fixed not existing on the type if I use GatsbyImageProps
interface ImageProps extends GatsbyImageOptionalProps {
    fluid?: FluidObject | FluidObject[]
    fixed?: FixedObject | FixedObject[]
}

const Image = ({ fluid, fixed, ...props }: ImageProps) => {
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
    else return <div>Unable to retrieve image</div>
}

export default Image
