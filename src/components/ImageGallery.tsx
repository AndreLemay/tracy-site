import { Grid, GridSize, GridSpacing } from "@material-ui/core"
import { FluidObject } from "gatsby-image"
import Image from "./Image"
import React from "react"
import Path from "path"

interface ImageGalleryProps {
    images: FluidObject[]
    cols?: GridSize
    spacing?: GridSpacing
}
export default ({ images, cols = 3, spacing = 2 }: ImageGalleryProps) => {
    return (
        <Grid container spacing={spacing} xs={12}>
            {images.map((img, i) => (
                <Grid key={i} xs={cols} item>
                    <Image fluid={img} alt={Path.basename(img.src)} />
                </Grid>
            ))}
        </Grid>
    )
}
