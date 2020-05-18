/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  
  if (page.path.match(/^\/account/)) {
	  
	//console.log('CREATING PAGE: ', page);
    page.matchPath = "/account/*";
    createPage(page)
  }
};

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allOpenApiSpec {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `).then(result => {
      result.data.allOpenApiSpec.edges.map(({ node }) => {
        createPage({
          path: `apis/${node.name}`,
          component: path.resolve(`./src/templates/swagger.js`),
          context: {
            id: node.id,
          },
        })
      })

      resolve()
    })
  })
}