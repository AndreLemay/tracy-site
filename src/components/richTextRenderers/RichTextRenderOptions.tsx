/* eslint-disable no-unused-vars */
import React, { ReactNode } from "react"
import { BLOCKS, MARKS, INLINES, Inline, Block, Text } from "@contentful/rich-text-types"
import { Options } from "@contentful/rich-text-react-renderer"
import ContentfulBookRenderer from "./ContentfulBookRenderer"
import { Box, Divider, List, ListItem, Typography } from "@material-ui/core"
import Image from "../Image"
import { ContentfulRichTextGatsbyReference } from "gatsby-source-contentful/rich-text"
import { FixedObject, FluidObject } from "gatsby-image"
import ContentfulBlogPostRenderer from "./ContentfulBlogPostRenderer"
import MuiLink from "@material-ui/core/Link"

enum ContentfulNodeTypes {
    BOOK = "ContentfulBook",
    BLOG_POST = "ContentfulBlogPost",
    ASSET = "ContentfulAsset",
}

interface ContentfulBook extends ContentfulRichTextGatsbyReference {
    __typename: ContentfulNodeTypes.BOOK
    contentful_id: string
    title: string
    shortDescription: string
    coverImage?: {
        fluid: FluidObject
    }
}

interface ContentfulBlogPost extends ContentfulRichTextGatsbyReference {
    __typename: ContentfulNodeTypes.BLOG_POST
    contentful_id: string
    title: string
    summary: string
}

interface ContentfulAsset extends ContentfulRichTextGatsbyReference {
    __typename: ContentfulNodeTypes.ASSET
    fixed?: FixedObject
    file: {
        fileName: string
        contentType: string
        url: string
    }
}

type ContentfulEntry = ContentfulBook | ContentfulBlogPost | ContentfulAsset

const inlineEntryRenderer = (node: Block | Inline, children: ReactNode): ReactNode => {
    const nodeData: ContentfulEntry = node.data.target
    switch (nodeData.__typename) {
        case ContentfulNodeTypes.BOOK:
            return <ContentfulBookRenderer.inlineRenderer {...nodeData} />
        case ContentfulNodeTypes.BLOG_POST:
            return <ContentfulBlogPostRenderer.inlineRenderer {...nodeData} />
        default:
            return <span>{`Unrecognized inline Content Type: ${nodeData.__typename}`}</span>
    }
}

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
        [MARKS.CODE]: text => <Box component="span">{text}</Box>, // TODO replace with something that looks good
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
        [INLINES.ENTRY_HYPERLINK]: inlineEntryRenderer,
        [INLINES.EMBEDDED_ENTRY]: inlineEntryRenderer,
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
        [BLOCKS.HEADING_1]: (node, children) => <Typography variant="h1">{children}</Typography>,
        [BLOCKS.HEADING_2]: (node, children) => <Typography variant="h2">{children}</Typography>,
        [BLOCKS.HEADING_3]: (node, children) => <Typography variant="h3">{children}</Typography>,
        [BLOCKS.HEADING_4]: (node, children) => <Typography variant="h4">{children}</Typography>,
        [BLOCKS.HEADING_5]: (node, children) => <Typography variant="h5">{children}</Typography>,
        [BLOCKS.HEADING_6]: (node, children) => <Typography variant="h6">{children}</Typography>,
        [BLOCKS.HR]: () => <Divider />,
        [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
        [BLOCKS.OL_LIST]: (node, children) => <List>{children}</List>,
        [BLOCKS.PARAGRAPH]: (node, children) => <Typography paragraph>{children}</Typography>,
        [BLOCKS.QUOTE]: (node, children) => <Typography variant="body2">{children}</Typography>, // TODO replace this with something that actually looks good
        [BLOCKS.UL_LIST]: (node, children) => <List>{children}</List>,
        [INLINES.HYPERLINK]: (node, children) => {
            let url = node.data.uri
            if (!/^(?:f|ht)tps?:\/\//.test(url)) {
                url = "http://" + url
            }
            return <MuiLink href={url}>{(node.content[0] as Text).value}</MuiLink>
        },
    },
}

export default commonOptions
