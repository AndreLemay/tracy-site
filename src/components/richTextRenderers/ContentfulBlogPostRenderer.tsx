import { Paper, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"

interface ContentfulBlogPostRendererProps {
    contentful_id: string
    title: string
    summary: string
}

const fullRenderer = ({ title, contentful_id, summary }: ContentfulBlogPostRendererProps) => {
    return (
        <Paper elevation={3}>
            <Typography variant="h4">
                <Link to={`/blog/${contentful_id}`}>{title}</Link>
            </Typography>
            <Typography variant="body1" component="span">
                {summary}
            </Typography>
        </Paper>
    )
}

const inlineRenderer = ({ title, contentful_id }: ContentfulBlogPostRendererProps) => {
    return (
        <Typography variant="body1" component="span">
            <Link to={`/blog/${contentful_id}`}>{title}</Link>
        </Typography>
    )
}

export default {
    fullRenderer,
    inlineRenderer,
}
