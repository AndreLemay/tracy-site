import React from "react"
import Img, { FixedObject, FluidObject } from "gatsby-image"

interface ImageProps {
    fluid?: FluidObject | FluidObject[]
    fixed?: FixedObject | FixedObject[]
}

const Image = ({ fluid, fixed }: ImageProps) => {
    if (fluid) return <Img fluid={fluid} />
    else if (fixed) return <Img fixed={fixed} />
    else return <div>Unable to retrieve image</div>
}

export default Image
