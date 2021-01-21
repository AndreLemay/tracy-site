import { Paper, Typography } from "@material-ui/core"
import React from "react"

interface ContentfulBookRendererProps {
    contentful_id: string
    title: string
}

const fullRenderer = ({ title }: ContentfulBookRendererProps) => {
    return (
        <Paper elevation={3}>
            <Typography variant="h4">{title}</Typography>
        </Paper>
    )
}

const inlineRenderer = ({ title }: ContentfulBookRendererProps) => {
    return (
        <Typography variant="body1" display="inline">
            {title}
        </Typography>
    )
}

export default {
    fullRenderer,
    inlineRenderer,
}
