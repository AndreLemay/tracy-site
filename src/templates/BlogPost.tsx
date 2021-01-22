import { Typography } from "@material-ui/core"
import { graphql } from "gatsby"
import {
    ContentfulRichTextGatsbyReference,
    renderRichText,
    RenderRichTextData,
} from "gatsby-source-contentful/rich-text"
import React from "react"
import RichTextRenderOptions from "../components/richTextRenderers/RichTextRenderOptions"
import Layout from "../components/Layout"

interface BlogPostProps {
    data: {
        contentfulBlogPost: {
            title: string
            body: RenderRichTextData<ContentfulRichTextGatsbyReference>
        }
    }
}

export default ({
    data: {
        contentfulBlogPost: { title, body },
    },
}: BlogPostProps) => {
    return (
        <Layout>
            <Typography variant="h1" align="center">
                {title}
            </Typography>
            {renderRichText(body, RichTextRenderOptions)}
        </Layout>
    )
}

export const query = graphql`
    query($id: String!) {
        contentfulBlogPost(id: { eq: $id }) {
            title
            body {
                raw
                references {
                    ... on ContentfulAsset {
                        contentful_id
                        id
                        fixed {
                            ...GatsbyContentfulFixed
                        }
                    }
                    ... on ContentfulBook {
                        contentful_id
                        title
                        shortDescription
                    }
                    ... on ContentfulBlogPost {
                        contentful_id
                        title
                        summary
                    }
                }
            }
        }
    }
`
