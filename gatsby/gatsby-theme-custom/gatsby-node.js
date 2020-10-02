/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// gatsby-node.js

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const LandingPageTemplate = require.resolve(`./src/components/templates/LandingPage/index.js`)

  const LandingPage = await graphql(`{
    allNodeLandingPage {
      nodes {
        id
        relationships {
          field_content_type {
            drupal_internal__type
            name
          }
        }
      }
    }
  }
  `)

  LandingPage.data.allNodeLandingPage.nodes.map(node => {
    const pathName = node.relationships.field_content_type.name.toLowerCase().replace(/ /g, '-')
    createPage({
      path: pathName,
      component: LandingPageTemplate,
      context: {
        LandingPageID: node.id,
        ContentType: node.relationships.field_content_type.drupal_internal__type,
      }
    })
  })
}
