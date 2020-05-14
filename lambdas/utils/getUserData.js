import request from 'request'
import querystring from 'querystring'
import {
    config
} from './oauth'

/* Call into https://app.intercom.io/me and return user data */
export default function getUserData(token) {
    const postData = querystring.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        app_id: config.appId
    })

    console.log('\n\n\n\n GetUserData Token: ', token);
    /*const requestOptions = {
        url: `${config.profilePath}`,
        json: true,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }*/
    
    const requestOptions = {
        url: `${config.profilePath}?${postData}`,
        json: true,
        auth: {
            user: token.token.access_token,
            pass: '',
        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
    return requestWrapper(requestOptions, token)
}

/* promisify request call */
function requestWrapper(requestOptions, token) {
    console.log('\n\n\n\n GetUserData requestOptions: ', requestOptions);
    return new Promise((resolve, reject) => {
        request(requestOptions, (err, response, body) => {
            if (err) {
                return reject(err)
            }
            // return data
            return resolve({
                token: token,
                data: body,
            })
        })
    })
}
