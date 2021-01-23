import { Grid, Typography, Divider, Box } from "@material-ui/core"
import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/Layout"

interface BlogProps {
    data: {
        allContentfulBlogPost: {
            nodes: {
                contentful_id: string
                title: string
                summary: string
                updatedAt: string
            }[]
        }
    }
}

export default ({
    data: {
        allContentfulBlogPost: { nodes },
    },
}: BlogProps) => (
    <Layout>
        <Grid container direction="column">
            {nodes.map(({ contentful_id, title, summary, updatedAt }, i) => {
                return (
                    <Grid item key={i}>
                        <Box display="flex" justifyContent="space-between">
                            <Link
                                to={`/blog/${contentful_id}`}
                                style={{ marginBottom: "1rem", display: "inline-block" }}
                            >
                                <Typography variant="h4">{title}</Typography>
                            </Link>
                            <Box fontStyle="italic" textAlign="right">
                                <Typography variant="subtitle1">{`Posted: ${updatedAt}`}</Typography>
                            </Box>
                        </Box>
                        <Typography variant="body1">{summary}</Typography>
                        <Divider />
                    </Grid>
                )
            })}
        </Grid>
    </Layout>
)

export const query = graphql`
    query {
        allContentfulBlogPost {
            nodes {
                contentful_id
                title
                summary
                updatedAt(formatString: "YYYY/MM/DD hh:mma")
            }
        }
    }
`
