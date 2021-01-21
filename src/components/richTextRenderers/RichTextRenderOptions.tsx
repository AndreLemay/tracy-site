/* eslint-disable no-unused-vars */
import React from "react"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { Options } from "@contentful/rich-text-react-renderer"
import ContentfulBookRenderer from "./ContentfulBookRenderer"
import { Box, Divider, List, ListItem, Typography } from "@material-ui/core"
import Image from "../Image"
import { ContentfulRichTextGatsbyReference } from "gatsby-source-contentful/rich-text"
import { FixedObject, FluidObject } from "gatsby-image"

enum ContentfulNodeTypes {
    BOOK = "ContentfulBook",
    ASSET = "ContentfulAsset",
}

interface ContentfulBook extends ContentfulRichTextGatsbyReference {
    __typename: ContentfulNodeTypes.BOOK
    contentful_id: string
    id: string
    title: string
}

interface ContentfulAsset extends ContentfulRichTextGatsbyReference {
    __typename: ContentfulNodeTypes.ASSET
    fixed?: FixedObject
    fluid?: FluidObject
    file: {
        fileName: string
        contentType: string
        url: string
    }
}

type ContentfulEntry = ContentfulBook | ContentfulAsset

const commonOptions: Options = {
    renderMark: {
        [MARKS.BOLD]: text => (
            <Box fontWeight={500} component="span">
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
                    return (
                        <ContentfulBookRenderer.fullRenderer
                            title={nodeData.title}
                            contentful_id={nodeData.contentful_id}
                        />
                    )
                default:
                    return <span>{`Unrecognized Content Type: ${nodeData.__typename}`}</span>
            }
        },
        [INLINES.EMBEDDED_ENTRY]: (node, children) => {
            const nodeData: ContentfulEntry = node.data.target
            switch (nodeData.__typename) {
                case ContentfulNodeTypes.BOOK:
                    return (
                        <ContentfulBookRenderer.inlineRenderer
                            title={nodeData.title}
                            contentful_id={nodeData.contentful_id}
                        />
                    )
                default:
                    return <span>{`Unrecognized inline Content Type: ${nodeData.__typename}`}</span>
            }
        },
        [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
            const nodeData: ContentfulAsset = node.data.target
            if ("fixed" in nodeData) return <Image fixed={nodeData.fixed} />
            else if ("fluid" in nodeData) return <Image fluid={nodeData.fluid} />
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
    },
}

export default commonOptions
