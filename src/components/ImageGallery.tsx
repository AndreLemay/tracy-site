import { Grid, GridSize, GridSpacing } from "@material-ui/core"
import { FluidObject } from "gatsby-image"
import Image from "./Image"
import React from "react"
import Path from "path"

interface ImageGalleryProps {
    images: FluidObject[]
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    spacing?: GridSpacing
    maxRowHeight?: number | string
}
export default ({ images, cols = 3, spacing = 2, maxRowHeight = "auto" }: ImageGalleryProps) => {
    //have to do this as GridSize is just a type union of 1-12 plus "auto", and TS will complain if I try to give the result of a calculation directly to GridSize props
    //i can be certain 12 / cols will always give m a value from 1-12 (aka valid GridSize) as I can't pass in anything but 1-12
    const numCol = (12 / cols) as GridSize

    return (
        <Grid container spacing={spacing}>
            {images.map((img, i) => (
                <Grid key={i} xs={numCol} item style={{ height: maxRowHeight }}>
                    <Image fluid={img} alt={Path.basename(img.src)} />
                </Grid>
            ))}
        </Grid>
    )
}
