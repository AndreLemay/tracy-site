import React from "react"
import Img, { FixedObject, FluidObject } from "gatsby-image"

interface ImageProps {
    fluid?: FluidObject | FluidObject[]
    fixed?: FixedObject | FixedObject[]
    alt?: string
}

const Image = ({ fluid, fixed, alt }: ImageProps) => {
    if (fluid) return <Img fluid={fluid} alt={alt} />
    else if (fixed) return <Img fixed={fixed} alt={alt} />
    else return <div>Unable to retrieve image</div>
}

export default Image
