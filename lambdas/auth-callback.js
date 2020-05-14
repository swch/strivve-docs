import getUserData from './utils/getUserData'
import oauth2, {
    config
} from './utils/oauth'

/* Function to handle github auth callback */
exports.handler = (event, context, callback) => {
    const code = event.queryStringParameters.code
    /* state helps mitigate CSRF attacks & Restore the previous state of your app */
    const state = event.queryStringParameters.state

    //console.log('auth-callback.js RESPONSE event: ', event);

    /* Take the grant code and exchange for an accessToken */
    oauth2.authorizationCode.getToken({
            code: code,
            redirect_uri: config.redirect_uri,
            state: state
        })
        .then((result) => {
            //console.log('authorizationCode.getToken result: ', result)
            const token = oauth2.accessToken.create(result)
            //console.log('authorizationCode.getToken token: ' + token)
            return token
        })
        // Get more info about github user
        .then(getUserData)
        // Do stuff with user data & token
        .then((result) => {
            //console.log('getUserData result.token: ', result.token)
            // Do stuff with user data
            //console.log('usgetUserDataer result.data: ', result.data)
            // Do other custom stuff
            //console.log('getUserData state: ', state)
            
            // return results to browser
            const userInfo = {
                    name: result.data.name,
                    email: result.data.email,
                    company: result.data.company,
                    location: result.data.location,
                    username: result.data.login,
                    avatar_url: result.data.avatar_url,
                    authHomeUrl: result.data.html_url
                    };
        
            return callback(null, {
                statusCode: 302,
                headers: {
                  Location: '/account/gh_callback?user=' + encodeURIComponent(JSON.stringify(userInfo)),
                  'Cache-Control': 'no-cache' // Disable caching of this response
                },

                body: ''
            })
        })
        .catch((error) => {
            console.log('Access Token Error', error.message, ' code: ', code)
            console.log(error)
            return callback(null, {
                statusCode: error.statusCode || 500,
                body: JSON.stringify({
                    error: error.message,
                })
            })
        })
}
