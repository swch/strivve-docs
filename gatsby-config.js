const {
    createProxyMiddleware
} = require('http-proxy-middleware');

// Set the Gatsby JS env variables - note this does not set the lambdas build env vars here
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)
require("dotenv").config({
    path: `${__dirname}/.env.${activeEnv}`,
});
//console.log('process.env: ', JSON.stringify(process.env))

const fs = require(`fs`)
const path = require(`path`)

const fromJson = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(data)
    })
  })
}

module.exports = {
    pathPrefix: '/',
    siteMetadata: require('./site-metadata.json'),
    // for avoiding CORS while developing Netlify Functions locally
    // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
    developMiddleware: app => {
        app.use(
            "/.netlify/lambdas/",
            createProxyMiddleware({
                secure: false,
                target: "http://localhost:9000",
                pathRewrite: {
                    "/.netlify/lambdas/": "",
                },
            }))
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: {
                prefixes: [`/account/*`]
            },
		},
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`,
            },
        },
        {
            resolve: `gatsby-plugin-stackbit-static-sass`,
            options: {
                inputFile: `${__dirname}/src/sass/main.scss`,
                outputFile: `${__dirname}/public/assets/css/main.css`
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [`gatsby-remark-component`],
                plugins: [`gatsby-remark-responsive-iframe`]
            }
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {
                path: `${__dirname}/src/pages`,
            }
        },
        {
            resolve: `@stackbit/gatsby-plugin-menus`,
            options: {
                sourceUrlPath: `fields.url`,
                pageContextProperty: `menus`,
                menus: require('./src/data/menus.json'),
            }
        },
        {
            resolve: `gatsby-source-openapi-aggregate`,
            options: {
                specs: [ // specs collection is required, you can define as many specs as you want
                        {
                        name: 'CardSavrSpec', // required, must be unique
                        resolve: () => fromJson(`${__dirname}/src/data/swagger-petstore.json`) // required, function which returns a Promise resolving Swagger JSON
                        }
                    ]
            }
        },
        `gatsby-plugin-glamor`,
        {
          resolve: `gatsby-plugin-typography`,
          options: {
            pathToConfigModule: `src/utils/typography`,
          },
        }
    ]
};
