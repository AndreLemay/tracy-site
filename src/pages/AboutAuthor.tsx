import { graphql } from "gatsby"
import {
    ContentfulRichTextGatsbyReference,
    renderRichText,
    RenderRichTextData,
} from "gatsby-source-contentful/rich-text"
import React from "react"
import Layout from "../components/Layout"
import RichTextRenderOptions from "../components/richTextRenderers/RichTextRenderOptions"

interface AboutAuthorProps {
    data: {
        allContentfulAboutAuthor: {
            nodes: {
                body: RenderRichTextData<ContentfulRichTextGatsbyReference>
            }[]
        }
    }
}

export default ({
    data: {
        allContentfulAboutAuthor: {
            nodes: [about],
        },
    },
}: AboutAuthorProps) => <Layout>{renderRichText(about.body, RichTextRenderOptions)}</Layout>

export const query = graphql`
    query {
        allContentfulAboutAuthor {
            nodes {
                body {
                    raw
                    references {
                        ... on ContentfulAsset {
                            ...RichTextContentfulAsset
                        }
                    }
                }
            }
        }
    }
`
