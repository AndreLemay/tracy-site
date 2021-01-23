/* eslint-disable no-unused-vars */
import React, { ReactNode } from "react"
import { BLOCKS, MARKS, INLINES, Inline, Block, Text } from "@contentful/rich-text-types"
import { Options } from "@contentful/rich-text-react-renderer"
import ContentfulBookRenderer from "./ContentfulBookRenderer"
import { Box, Divider, List, ListItem, makeStyles, Paper, Typography } from "@material-ui/core"
import Image from "../Image"
import { ContentfulRichTextGatsbyReference } from "gatsby-source-contentful/rich-text"
import { FixedObject, FluidObject } from "gatsby-image"
import ContentfulBlogPostRenderer from "./ContentfulBlogPostRenderer"
import MuiLink from "@material-ui/core/Link"
import { graphql, Link } from "gatsby"

enum ContentfulNodeTypes {
    BOOK = "ContentfulBook",
    BLOG_POST = "ContentfulBlogPost",
    ASSET = "ContentfulAsset",
}

interface ContentfulBook extends ContentfulRichTextGatsbyReference {
    __typename: ContentfulNodeTypes.BOOK
    contentful_id: string
    bookTitle: string
    shortDescription: string
    coverImage?: {
        fluid: FluidObject
    }
}

interface ContentfulBlogPost extends ContentfulRichTextGatsbyReference {
    __typename: ContentfulNodeTypes.BLOG_POST
    contentful_id: string
    postTitle: string
    summary: string
}

interface ContentfulAsset extends ContentfulRichTextGatsbyReference {
    __typename: ContentfulNodeTypes.ASSET
    fixed?: FixedObject
    file: {
        fileName: string
        url: string
    }
}

type ContentfulEntry = ContentfulBook | ContentfulBlogPost | ContentfulAsset

const httpify = (url: string) => {
    if (!/^(?:f|ht)tps?:\/\//.test(url)) {
        url = "http://" + url
    }
    return url
}

const blockQuoteStyles = makeStyles({
    root: {
        "& .MuiTypography-paragraph": {
            fontSize: "inherit",
            fontFamily: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
            letterSpacing: "inherit",
        },
    },
})

// TODO improve safety checks around node data to ensure it's actually there and gracefully handle cases where it's not
const commonOptions: Options = {
    renderMark: {
        [MARKS.BOLD]: text => (
            <Box fontWeight={700} component="span">
                {text}
            </Box>
        ),
        [MARKS.ITALIC]: text => (
            <Box fontStyle="italic" component="span">
                {text}
            </Box>
        ),
        [MARKS.UNDERLINE]: text => (
            <Box style={{ textDecoration: "underline" }} component="span">
                {text}
            </Box>
        ),
        [MARKS.CODE]: text => (
            <Box marginLeft="3rem">
                <Paper style={{ overflowX: "auto" }}>
                    <Box padding="1rem">
                        <Typography variant="body2" style={{ whiteSpace: "pre" }}>
                            {text}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        ),
    },
    renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
            const nodeData: ContentfulEntry = node.data.target
            switch (nodeData.__typename) {
                case ContentfulNodeTypes.BOOK:
                    return <ContentfulBookRenderer.fullRenderer {...nodeData} />
                case ContentfulNodeTypes.BLOG_POST:
                    return <ContentfulBlogPostRenderer.fullRenderer {...nodeData} />
                default:
                    return <span>{`Unrecognized Content Type: ${nodeData.__typename}`}</span>
            }
        },
        [INLINES.EMBEDDED_ENTRY]: (node, children) => {
            const nodeData: ContentfulEntry = node.data.target
            switch (nodeData.__typename) {
                case ContentfulNodeTypes.BOOK:
                    return <ContentfulBookRenderer.inlineRenderer {...nodeData} />
                case ContentfulNodeTypes.BLOG_POST:
                    return <ContentfulBlogPostRenderer.inlineRenderer {...nodeData} />
                default:
                    return <span>{`Unrecognized inline Entry Type: ${nodeData.__typename}`}</span>
            }
        },
        [INLINES.ENTRY_HYPERLINK]: (node, children) => {
            const nodeData: ContentfulEntry = node.data.target
            switch (nodeData.__typename) {
                case ContentfulNodeTypes.BOOK:
                    return <Link to={`/books/${nodeData.contentful_id}`}>{(node.content[0] as Text).value}</Link>
                case ContentfulNodeTypes.BLOG_POST:
                    return <Link to={`/blog/${nodeData.contentful_id}`}>{(node.content[0] as Text).value}</Link>
                default:
                    return <span>{`Unrecognized Entry Hyperlink Type: ${nodeData.__typename}`}</span>
            }
        },
        [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
            const nodeData: ContentfulAsset = node.data.target
            if ("fixed" in nodeData)
                return (
                    <Box width="100%" display="flex" justifyContent="center" marginBottom="2rem" marginTop="2rem">
                        <Image
                            fixed={nodeData.fixed}
                            style={{ width: nodeData.fixed.width, height: nodeData.fixed.height, flex: "0 0 auto" }}
                        />
                    </Box>
                )
            else if ("file" in nodeData) return <span>{`This is some kind of file: ${nodeData.file.fileName}`}</span>
            // TODO implement rendering for different file types based on file.contentType
            else return <span>No idea what this is</span>
        },
        [INLINES.ASSET_HYPERLINK]: (node, children) => {
            const nodeData: ContentfulAsset = node.data.target
            return <MuiLink href={httpify(nodeData.file.url)}>{(node.content[0] as Text).value}</MuiLink>
        },
        [BLOCKS.HEADING_1]: (node, children) => <Typography variant="h1">{children}</Typography>,
        [BLOCKS.HEADING_2]: (node, children) => <Typography variant="h2">{children}</Typography>,
        [BLOCKS.HEADING_3]: (node, children) => <Typography variant="h3">{children}</Typography>,
        [BLOCKS.HEADING_4]: (node, children) => <Typography variant="h4">{children}</Typography>,
        [BLOCKS.HEADING_5]: (node, children) => <Typography variant="h5">{children}</Typography>,
        [BLOCKS.HEADING_6]: (node, children) => <Typography variant="h6">{children}</Typography>,
        [BLOCKS.HR]: () => <Divider style={{ marginBottom: "1rem" }} />,
        [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
        [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
        [BLOCKS.PARAGRAPH]: (node, children) => <Typography paragraph>{children}</Typography>,
        [BLOCKS.QUOTE]: (node, children) => {
            const classes = blockQuoteStyles()
            return (
                <Box marginLeft="3rem" marginBottom="1rem">
                    <Paper style={{ maxWidth: 400 }}>
                        <Box padding="1rem" textAlign="center" fontStyle="italic">
                            <Typography variant="h5" classes={{ root: classes.root }}>
                                {children}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            )
        },
        [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
        [INLINES.HYPERLINK]: (node, children) => (
            <MuiLink href={httpify(node.data.uri)}>{(node.content[0] as Text).value}</MuiLink>
        ),
    },
}

export default commonOptions

export const richTextContentfulBookFragment = graphql`
    fragment RichTextContentfulBook on ContentfulBook {
        contentful_id
        bookTitle
        shortDescription
        coverImage {
            fluid {
                ...GatsbyContentfulFluid
            }
        }
    }

    fragment RichTextContentfulBlogPost on ContentfulBlogPost {
        contentful_id
        postTitle
        summary
    }

    fragment RichTextContentfulAsset on ContentfulAsset {
        contentful_id
        fixed {
            ...GatsbyContentfulFixed
        }
        file {
            fileName
            url
        }
    }
`
