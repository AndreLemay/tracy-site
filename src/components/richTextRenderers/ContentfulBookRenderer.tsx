import { Paper, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"

interface ContentfulBookRendererProps {
    contentful_id: string
    title: string
    shortDescription: string
}

const fullRenderer = ({ title, contentful_id, shortDescription }: ContentfulBookRendererProps) => {
    return (
        <Paper elevation={3}>
            <Typography variant="h4">
                <Link to={`/books/${contentful_id}`}>{title}</Link>
            </Typography>
            <Typography variant="body1" component="span">
                {shortDescription}
            </Typography>
        </Paper>
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
