import { FixedObject } from "gatsby-image"
import React from "react"
import Image from "../components/Image"
import {
    ContentfulRichTextGatsbyReference,
    renderRichText,
    RenderRichTextData,
} from "gatsby-source-contentful/rich-text"
import { graphql } from "gatsby"
import { Container, Divider, Grid, Paper, Typography } from "@material-ui/core"
import Layout from "../components/Layout"
import RichTextRenderOptions from "../components/richTextRenderers/RichTextRenderOptions"
import Seo from "../components/Seo"

interface BookProps {
    data: {
        contentfulBook: {
            bookTitle: string
            shortDescription: string
            description: RenderRichTextData<ContentfulRichTextGatsbyReference>
            reviews?: {
                stars?: 0 | 1 | 2 | 3 | 4 | 5
                quote: {
                    quote: string
                }
            }[]
            coverImage?: {
                fixed: FixedObject
            }
        }
    }
}

export default ({
    data: {
        contentfulBook: { bookTitle, shortDescription, description, reviews, coverImage },
    },
}: BookProps) => {
    return (
        <Layout>
            <Seo
                title={bookTitle}
                description={shortDescription}
                {...(coverImage
                    ? {
                          image: {
                              url: coverImage.fixed.src,
                              width: coverImage.fixed.width,
                              height: coverImage.fixed.height,
                              alt: bookTitle,
                          },
                      }
                    : {})}
            />
            <Container>
                <Paper elevation={2}>
                    <Grid container>
                        <Grid container item xs={9} direction="row">
                            <div>{bookTitle}</div>
                            <div>{renderRichText(description, RichTextRenderOptions)}</div>
                        </Grid>
                        <Grid item xs={3}>
                            {
                                // TODO use a proper placeholder just for book covers
                                coverImage ? <Image fixed={coverImage.fixed} /> : <Image />
                            }
                        </Grid>
                    </Grid>
                    <Divider variant="middle" />
                    {reviews &&
                        reviews.map((review, i) => (
                            <div key={i}>
                                <Typography variant="caption">{review.quote.quote}</Typography>
                                <Typography variant="subtitle1">{`${review.stars}/5 Stars`}</Typography>
                            </div>
                        ))}
                </Paper>
            </Container>
        </Layout>
    )
}

export const query = graphql`
    query($id: String!) {
        contentfulBook(id: { eq: $id }) {
            bookTitle
            shortDescription
            description {
                raw
            }
            reviews {
                stars
            }
            coverImage {
                fixed(width: 1200, height: 630) {
                    ...GatsbyContentfulFixed
                }
            }
        }
    }
`
