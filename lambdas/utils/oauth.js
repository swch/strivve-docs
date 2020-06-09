import simpleOauth from 'simple-oauth2'
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
require('dotenv').config({ path: './.env.' + activeEnv});

//console.log('lambdas using activeEnv: ' + activeEnv);
//console.log('process.env: ' + JSON.stringify(process.env))
//console.log('process.cwd: ' + process.cwd());

const githubOauthApi = 'https://github.com'
const githubApi = 'https://api.github.com'
/* `https://github.com/login/oauth/authorize?${search}`*/

export const config = {
  /* values set in terminal session or in netlify environment variables */
  appId: process.env.GH_CLIENT_APP_ID,
  clientId: process.env.GH_CLIENT_ID,
  clientSecret: process.env.GH_CLIENT_SECRET,
  /* GitHub oauth API endpoints */
  authorizeHost: githubOauthApi,
  authorizePath: '/login/oauth/authorize',
  tokenHost: githubOauthApi,
  tokenPath: '/login/oauth/access_token',
  /* GitHub Secure API endpoints */
  profilePath: `${githubApi}/user`,
  /* redirect_uri is the callback url after successful signin */
  redirect_uri: process.env.GH_REDIRECT_URI,
}

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set GH_CLIENT_ID')
  }
  if (!credentials.client.secret) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set GH_CLIENT_SECRET')
  }
  // return oauth instance
  return simpleOauth.create(credentials)
}

/* Create oauth2 instance to use in our two functions */
export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath
  }
})
