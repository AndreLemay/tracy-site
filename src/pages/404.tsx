import { Box, Typography } from "@material-ui/core"
import { PageProps } from "gatsby"
import React from "react"
import Layout from "../components/Layout"

export default (props: PageProps) => {
    return (
        <Layout>
            <Box>
                <Typography variant="h3">Oops! This page doesn&apos;t exist.</Typography>
                <Typography variant="body1">{`Looks like you tried to access: ${props.location.href}, but we couldn't find a page there.`}</Typography>
                <Typography variant="body1">Possible reasons for this:</Typography>
                <ul>
                    <li>
                        <Typography variant="body1">There&apos;s no page at this url.</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            This page hasn&apos;t been built yet (I&apos;m working on it!)
                        </Typography>
                    </li>
                </ul>
            </Box>
        </Layout>
    )
}
