import React from "react"
import Img, { FixedObject, FluidObject, GatsbyImageOptionalProps } from "gatsby-image"

//have to basically recreate this because typescript will complain about fluid/fixed not existing on the type if I use GatsbyImageProps
interface ImageProps extends GatsbyImageOptionalProps {
    fluid?: FluidObject | FluidObject[]
    fixed?: FixedObject | FixedObject[]
}

const Image = ({ fluid, fixed, ...props }: ImageProps) => {
    if (fluid) return <Img fluid={fluid} {...props} />
    else if (fixed) return <Img fixed={fixed} {...props} />
    else return <div>Unable to retrieve image</div>
}

export default Image
