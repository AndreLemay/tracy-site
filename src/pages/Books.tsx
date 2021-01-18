import { graphql } from "gatsby"
import { FluidObject } from "gatsby-image"
import React from "react"
import ImageGallery from "../components/ImageGallery"
import Layout from "../components/Layout"

interface BooksPageProps {
    data: {
        allContentfulBook: {
            nodes: {
                id: string
                coverImage: {
                    fluid: FluidObject
                }
            }[]
        }
    }
}

export default ({
    data: {
        allContentfulBook: { nodes },
    },
}: BooksPageProps) => (
    <Layout>
        <ImageGallery images={nodes.map(n => n.coverImage.fluid)} cols={1} />
    </Layout>
)

export const query = graphql`
    query {
        allContentfulBook {
            nodes {
                id
                coverImage {
                    fluid(maxWidth: 400) {
                        ...GatsbyContentfulFluid
                    }
                }
            }
        }
    }
`
