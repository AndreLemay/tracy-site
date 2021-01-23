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
            postTitle: string
            body: RenderRichTextData<ContentfulRichTextGatsbyReference>
        }
    }
}

export default ({
    data: {
        contentfulBlogPost: { postTitle, body },
    },
}: BlogPostProps) => {
    return (
        <Layout>
            <Typography variant="h1" align="center" gutterBottom>
                {postTitle}
            </Typography>
            {renderRichText(body, RichTextRenderOptions)}
        </Layout>
    )
}

export const query = graphql`
    query($id: String!) {
        contentfulBlogPost(id: { eq: $id }) {
            postTitle
            body {
                raw
                references {
                    ... on ContentfulAsset {
                        ...RichTextContentfulAsset
                    }
                    ... on ContentfulBook {
                        ...RichTextContentfulBook
                    }
                    ... on ContentfulBlogPost {
                        ...RichTextContentfulBlogPost
                    }
                }
            }
        }
    }
`
