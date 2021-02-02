/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

interface SEOProps {
    title?: string
    meta?: {
        name?: string
        property?: string
        content: string
    }[]
    lang?: string
    description?: string
    keywords?: string
    image?: {
        url: string
        alt?: string
        width: number
        height: number
    }
}

export default ({ description, lang, meta, title, keywords, image }: SEOProps) => {
    const {
        site: {
            siteMetadata: { defaultTitle, defaultDescription, defaultKeywords, twitterHandle, siteUrl },
        },
    } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        defaultTitle: title
                        defaultDescription: description
                        defaultKeywords: keywords
                        twitterHandle
                        siteUrl
                    }
                }
            }
        `
    )

    const location = useLocation()

    return (
        <>
            <Helmet titleTemplate="Tracy Goldfarb - %s" defaultTitle={defaultTitle}>
                <html lang={lang} />
                <title>{title}</title>
                <base target="_blank" href="http://localhost:8000/" />
                <meta charSet="utf-8" />
                <meta name="description" content={description || defaultDescription} />
                <meta name="keywords" content={keywords || defaultKeywords} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description || defaultDescription} />
                {image &&
                    Object.keys(image).map((key, i) => {
                        switch (key) {
                            case "url":
                                return <meta key={i} property="og:image" content={image.url} />
                            case "width":
                                return <meta key={i} property="og:image:width" content={`${image.width}`} />
                            case "height":
                                return <meta key={i} property="og:image:height" content={`${image.height}`} />
                            case "alt":
                                return <meta key={i} property="twitter:image:alt" content={image.alt} />
                            default:
                                return null
                        }
                    })}
                <meta property="og:url" content={`${siteUrl}${location.pathname}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site:id" content={twitterHandle} />
                <meta property="og:site_name" content="Tracy Goldfarb" />
                {meta &&
                    meta.map(({ name, property, content }, i) => (
                        <meta key={i} {...(name ? { name } : property ? { property } : {})} content={content} />
                    ))}
                <link rel="canonical" href={`${siteUrl}${location.pathname}`} />
            </Helmet>
        </>
    )
}
