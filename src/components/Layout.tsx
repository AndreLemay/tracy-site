import { CssBaseline } from "@material-ui/core"
import React from "react"
//import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header"

export default ({ children }: React.PropsWithChildren<{}>) => {
    // const data = useStaticQuery(graphql`
    //     query SiteTitleQuery {
    //         site {
    //             siteMetadata {
    //                 title
    //             }
    //         }
    //     }
    // `)

    return (
        <>
            <Header />
            <CssBaseline />
            <div
                style={{
                    margin: "0 auto",
                    maxWidth: 960,
                    padding: "1.5rem",
                }}
            >
                <main>{children}</main>
                <footer
                    style={{
                        marginTop: "2rem",
                    }}
                >
                    © {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.com">Gatsby</a>
                </footer>
            </div>
        </>
    )
}
