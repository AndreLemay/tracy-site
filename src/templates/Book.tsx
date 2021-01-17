import { FixedObject } from "gatsby-image"
import React from "react"
import Image from "../components/Image"
import {
    ContentfulRichTextGatsbyReference,
    renderRichText,
    RenderRichTextData,
} from "gatsby-source-contentful/rich-text"
import { graphql } from "gatsby"
import { Container, Grid, Paper } from "@material-ui/core"
import Layout from "../components/Layout"

interface BookProps {
    data: {
        contentfulBook: {
            title: string
            description: RenderRichTextData<ContentfulRichTextGatsbyReference>
            coverImage: {
                fixed: FixedObject
            }
        }
    }
}

export default ({ data }: BookProps) => {
    return (
        <Layout>
            <Container>
                <Paper elevation={2}>
                    <Grid container>
                        <Grid container item xs={9} direction="row">
                            <div>{data.contentfulBook.title}</div>
                            <div>{renderRichText(data.contentfulBook.description)}</div>
                        </Grid>
                        <Grid item xs={3}>
                            <Image
                                fixed={data.contentfulBook.coverImage.fixed}
                                style={{ width: "100%", height: "100%" }}
                                imgStyle={{ objectFit: "contain" }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Layout>
    )
}

export const query = graphql`
    query($id: String!) {
        contentfulBook(id: { eq: $id }) {
            title
            description {
                raw
            }
            coverImage {
                fixed(width: 400) {
                    ...GatsbyContentfulFixed
                }
            }
        }
    }
`
