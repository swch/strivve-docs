<div style="text-align: center"><H1>Local Builds and Testing Reference for Strivve Developer Documentation Site/App</H1></div>
<div style="text-align: center"><H3>Building and Testing Locally</H3></div>


_This reference is written for those who need to build, run and test and modify content & pages within this project._

<div>&nbsp;</div>

****

<div>&nbsp;</div>

##### Development Env Variables for production and preproduction deploy contexts
In the gatsby-config.js node file, there is a proxy middleware NPM package we use to roxy rewrite the lambdas so they can be built and run locallly.  Below is the basic configuration, for more detals see this article ()
```javascript
const {
    createProxyMiddleware
} = require('http-proxy-middleware');
```


###### .env.development - DotEnv LOCAL Development Build Variables
    GH_CLIENT_APP_ID='1285225'
    GH_CLIENT_ID='76ce40eaa5718c5271cf'
    GH_CLIENT_SECRET='b113b5ac57eb0dbaf57501a6a301b3ac62474ba2'
    GH_AUTH_URI='http://localhost:8000/.netlify/lambdas/auth'
    GH_REDIRECT_URI='http://localhost:8000/.netlify/lambdas/auth-callback'


###### .env.production - DotEnv LOCAL Production Build Variables
    GH_CLIENT_APP_ID**='1280686'
    GH_CLIENT_ID**='963d366d593be476d2d1'
    GH_CLIENT_SECRET**='f953906547672cdb59204e6499d8089106ced79e'
    GH_AUTH_URI**='https://strivve-docs-8b1ae.netlify.app/.netlify/functions/auth'
    GH_REDIRECT_URI**='https://strivve-docs-8b1ae.netlify.app/.netlify/functions/auth-callback'


## Getting Started with a Local Build nd Development Server

#### Running locally



# Running Your Site Locally

1. Install [Node.js and npm](https://nodejs.org/en/)

1. Install npm dependencies:

        npm install

1. *(Optional)* get "stackbit-api-key" from project menu in [Stackbit dashboard](https://app.stackbit.com/dashboard)

    3.1. run the following command to assign this key to `STACKBIT_API_KEY` environment variable:

        export STACKBIT_API_KEY={stackbit_netlify_api_key}

1. Start a development server - note: _You can also use 'npm config' to switch between a local production or local development build_

        npm start

1. Browse to [http://localhost:8000/](http://localhost:8000/)

#### Gatsby Caching
Gatsby caches everything.  So if you add new pages, and change the layouts, or add new scss, you will likely need to run:

    $ gatsby clean  -- cleans the publicand .cache folders of Gatsby
    $ npm start     -- full rebuild, cache is gone

***
