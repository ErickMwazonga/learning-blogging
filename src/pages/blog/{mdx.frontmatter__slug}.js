import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPost = ({ data, children }) => {
  const { mdx: { frontmatter }} = data;
  const image = getImage(frontmatter.hero_image)

  return (
    <Layout pageTitle={frontmatter.title}>
      <p>{frontmatter.date}</p>
      <GatsbyImage
        image={image}
        alt={frontmatter.hero_image_alt}
      />
      <p>
        Photo Credit:{" "}
        <a href={frontmatter.hero_image_credit_link}>
          {frontmatter.hero_image_credit_text}
        </a>
      </p>
      {children}
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export const Head = ({ data: { mdx } }) => <Seo title={mdx.frontmatter.title} />

export default BlogPost