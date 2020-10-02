// src/components/templates/LandingPage/index.js
import React from 'react'
import { graphql, Link } from 'gatsby'

function LandingPage({ data, pageContext }) {

  const landingPage = data.nodeLandingPage
  const nodeType = data.allNodeTypeNodeType
  const contentType = 'node__' + pageContext.ContentType

  const getContentArray = (contentType) => {
    return (node) => (node.relationships[contentType])
  }

  const contentArray = nodeType.nodes.map(getContentArray(contentType))
  const contentArrayFlat = contentArray.flat()

  return (
    <div>
      <h1>{landingPage.title}</h1>
      <div className='content-list'>
        <ul>
          {contentArrayFlat.map((item, i) => <li key={i}><Link to={item.path.alias}>{item.title}</Link></li>)}
        </ul>
      </div>
    </div>
  )
}

export default LandingPage

export const query = graphql`
  query($LandingPageID: String!, $ContentType: String!){
    nodeLandingPage(id: { eq: $LandingPageID }) {
      id
      title
    }
    allNodeTypeNodeType(filter: { drupal_internal__type: { eq: $ContentType }}) {
      nodes {
        relationships {
          node__article {
            id
            title
            path {
              alias
            }
          }
          node__page {
            id
            title
            path {
              alias
            }
          }
        }
      }
    }
  }
`
