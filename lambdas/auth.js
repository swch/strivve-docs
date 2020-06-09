import oauth2, { config } from './utils/oauth'

/* Do initial auth redirect */
exports.handler = (event, context, callback) => {
	const ghState = '398976548768787';
	const ghScope='';
	
  /* Generate authorizationURI */
  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    /* Specify how your app needs to access the user’s account. */
    scope: ghScope,
    /* State helps mitigate CSRF attacks & Restore the previous state of your app */
    state: ghState
  })
  //console.log('auth.js RESPONSE event:\n', event);
  //console.log('\nauth.js RESPONSE authorizationURI:\n', authorizationURI);

    /* Redirect user to authorizationURI */
  const response = {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      'Cache-Control': 'no-cache' // Disable caching of this response
    },
    body: '' // return body for local dev
  }

  return callback(null, response)
}
