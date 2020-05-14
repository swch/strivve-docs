const { createProxyMiddleware } = require('http-proxy-middleware');

const activeEnv =
	process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
	console.log(`Using environment config: '${activeEnv}'`)
	require("dotenv").config({
		path: `.env.${activeEnv}`,
	});

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
		  options: { prefixes: [`/services/*`] },
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
        }
    ]
};
