import { Box, Paper, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"

interface ContentfulBlogPostRendererProps {
    contentful_id: string
    postTitle: string
    summary: string
}

const fullRenderer = ({ postTitle, contentful_id, summary }: ContentfulBlogPostRendererProps) => {
    return (
        <Box display="flex" justifyContent="center" marginBottom="1rem">
            <Paper elevation={3}>
                <Box width={600} height={200} padding="1rem">
                    <Typography variant="h4" gutterBottom>
                        <Link to={`/blog/${contentful_id}`}>{postTitle}</Link>
                    </Typography>
                    <Typography variant="body1" component="span">
                        {summary}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    )
}

const inlineRenderer = ({ postTitle, contentful_id }: ContentfulBlogPostRendererProps) => {
    return (
        <Typography variant="body1" component="span">
            <Link to={`/blog/${contentful_id}`}>{postTitle}</Link>
        </Typography>
    )
}

export default {
    fullRenderer,
    inlineRenderer,
}
