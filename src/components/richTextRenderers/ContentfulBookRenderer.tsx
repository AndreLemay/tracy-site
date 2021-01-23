import { Box, Grid, Paper, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import { FluidObject } from "gatsby-image"
import React from "react"
import Image from "../Image"

interface ContentfulBookRendererProps {
    contentful_id: string
    title: string
    shortDescription: string
    coverImage?: {
        fluid: FluidObject
    }
}

const fullRenderer = ({ title, contentful_id, shortDescription, coverImage }: ContentfulBookRendererProps) => {
    return (
        <Box display="flex" justifyContent="center" marginBottom="1rem">
            <Box height={250} width={600}>
                <Paper elevation={3} style={{ height: "100%" }}>
                    <Box padding="1rem" height="100%">
                        <Grid container style={{ height: "100%" }}>
                            <Grid item xs={6} style={{ height: "100%" }}>
                                <Typography variant="h4" gutterBottom>
                                    <Link to={`/books/${contentful_id}`}>{title}</Link>
                                </Typography>
                                <Typography variant="body1" component="span">
                                    {shortDescription}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} style={{ height: "100%" }}>
                                <Image fluid={coverImage && coverImage.fluid} />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}

const inlineRenderer = ({ title, contentful_id }: ContentfulBookRendererProps) => {
    return (
        <Typography variant="body1" component="span">
            <Link to={`/books/${contentful_id}`}>{title}</Link>
        </Typography>
    )
}

export default {
    fullRenderer,
    inlineRenderer,
}
