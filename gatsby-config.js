require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: `Tracy Goldfarb`,
        description: `Portfolio/Author/Dabblings/Whatever.`,
        keywords: `author,lgbt,lgbtq+,book,`,
        twitterHandle: `@tracy_goldfarb`,
        siteUrl: `localhost:8000`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-schema-export`,
            options: {
                dest: "./schema.graphql",
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-material-ui`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: `776ipr8xlqr9`,
                accessToken: process.env.CONTENTFUL_TOKEN,
                downloadLocal: true,
            },
        },
        `gatsby-transformer-remark`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
