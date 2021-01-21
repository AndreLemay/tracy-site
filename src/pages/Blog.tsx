import { Grid, Typography } from "@material-ui/core"
import { graphql, Link } from "gatsby"
import React from "react"

interface BlogProps {
    data: {
        allContentfulBlogPost: {
            nodes: {
                contentful_id: string
                title: string
                summary: string
            }[]
        }
    }
}

export default ({
    data: {
        allContentfulBlogPost: { nodes },
    },
}: BlogProps) => (
    <Grid container direction="column">
        {nodes.map(({ contentful_id, title, summary }, i) => (
            <Grid item key={i}>
                <Link to={`/blog/${contentful_id}`}>
                    <Typography variant="h4">{title}</Typography>
                </Link>
                <Typography variant="subtitle1">{summary}</Typography>
            </Grid>
        ))}
    </Grid>
)

export const query = graphql`
    query {
        allContentfulBlogPost {
            nodes {
                contentful_id
                title
                summary
            }
        }
    }
`
