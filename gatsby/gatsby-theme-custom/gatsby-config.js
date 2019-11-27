const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

const envFile = `../.env.${process.env.NODE_ENV}`

if (fs.existsSync(envFile)) {
  dotenv.config({
    path: `${envFile}`
  })
}

module.exports = {
  siteMetadata: {
    title: `${process.env.SITE_NAME}`,
    domain: `${process.env.PROJECT_URL}`,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-drupal',
      options: {
        baseUrl: `${process.env.DRUPAL_HOST}`,
        apiBase: 'api',
      },
    },
  ]
}
