import getUserData from './utils/getUserData'
import oauth2, { config } from './utils/oauth'

/* Function to handle github auth callback */
exports.handler = (event, context, callback) => {
  const code = event.queryStringParameters.code
  /* state helps mitigate CSRF attacks & Restore the previous state of your app */
  const state = event.queryStringParameters.state

  console.log('auth-callback.js RESPONSE event: ', event);

  /* Take the grant code and exchange for an accessToken */
  oauth2.authorizationCode.getToken({
    code: code,
    redirect_uri: config.redirect_uri,
	state: state
  })
    .then((result) => {
      const token = oauth2.accessToken.create(result)
      console.log('accessToken', token)
      return token
    })
    // Get more info about github user
    .then(getUserData)
    // Do stuff with user data & token
    .then((result) => {
      console.log('auth token', result.token)
      // Do stuff with user data
      console.log('user data', result.data)
      // Do other custom stuff
      console.log('state', state)
      // return results to browser
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({ name: result.data.name, email: result.data.email, company: result.data.company, location: result.data.location, username: result.data.login, avatar_url: result.data.avatar_url, authHomeUrl: result.data.html_url } )
      })
    })
    .catch((error) => {
      console.log('Access Token Error', error.message, ' code: ',code)
      console.log(error)
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message,
        })
      })
    })
}
