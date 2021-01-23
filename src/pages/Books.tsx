import { Box, Grid, Typography } from "@material-ui/core"
import { graphql } from "gatsby"
import { FluidObject } from "gatsby-image"
import React from "react"
import Layout from "../components/Layout"
import Image from "../components/Image"

interface BooksPageProps {
    data: {
        allContentfulBook: {
            nodes: {
                id: string
                title: string
                shortDescription: string
                releaseDate: string
                coverImage?: {
                    fluid: FluidObject
                }
            }[]
        }
    }
}

export default ({
    data: {
        allContentfulBook: { nodes },
    },
}: BooksPageProps) => (
    <Layout>
        {nodes.map(({ releaseDate, title, shortDescription, coverImage }, i) => {
            const rDate = new Date(releaseDate) //comes in as a string, needs to be converted to date object
            return (
                <Box key={i} height={400}>
                    <Grid container direction="row">
                        <Grid item xs={8} container direction="column">
                            <Grid item>
                                <Typography variant="h3">
                                    {rDate < new Date() ? "Available now!" : `Available ${rDate.toDateString()}`}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h2">{title}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">{shortDescription}</Typography>
                            </Grid>
                            <Grid item>Eventually put some kind of &quot;(Pre-)Order Now&quot; button here.</Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Image fluid={coverImage && coverImage.fluid} />
                        </Grid>
                    </Grid>
                </Box>
            )
        })}
    </Layout>
)

export const query = graphql`
    query {
        allContentfulBook {
            nodes {
                id
                title
                shortDescription
                releaseDate
                coverImage {
                    fluid {
                        ...GatsbyContentfulFluid
                    }
                }
            }
        }
    }
`
