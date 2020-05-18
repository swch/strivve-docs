// src/utils/auth.js
import {
    navigate
} from "gatsby"

const isBrowser = typeof window !== "undefined"

let user = {}
const userInfoKey = 'Strivve-docs-user-info';

export const isAuthenticated = () => {
    if (!isBrowser) {
        return;
    }

    var ghUserInfo = getProfile();
    return (ghUserInfo !== null);
}

export const login = () => {
    if (!isBrowser) {
        return;
    }

    //auth.authorize()
}

function setSession(bIsLoggedIn, authResult) {
    const storage = isBrowser ? window.sessionStorage : null;
    
    //window.alert('In auth.js: setSession: bIsLoggedIn: ' + bIsLoggedIn + ' - authResult: ' + authResult )
    if (!bIsLoggedIn && authResult) {
        /*let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
        tokens.accessToken = authResult.accessToken
        tokens.idToken = authResult.idToken
        tokens.expiresAt = expiresAt
        user = authResult.idTokenPayload
        localStorage.setItem("isLoggedIn", true)
        */
        storage.setItem(userInfoKey, authResult );
    }
    navigate("/")
    return
}

export const silentAuth = callback => {
    var bIsAuthenticated = isAuthenticated();
    if (bIsAuthenticated) return callback()
    //window.alert('In silentAuth: isAuthenticated: ' + bIsAuthenticated )
    // redirect to account sign in page
    var cbReturn = callback();
    navigate('/account');

    return cbReturn;
}

export const handleAuthentication = (userInfo) => {
    //window.alert('In handleAuthentication: isBrowser: ' + isBrowser )
    //window.alert('In handleAuthentication: typeof(userInfo): ' + typeof(userInfo) )
    //window.alert('In handleAuthentication: isBrowser: ' + isBrowser + '  userInfo: ' + userInfo )
    if (isBrowser && (typeof(userInfo) == 'string')) { // stringified object
        //window.alert('In handleAuthentication: Calling setSession')
        setSession(false, userInfo);
        navigate('/');
    }
    return;
}

export const getProfile = () => {
    const storage = isBrowser ? window.sessionStorage : null;
    if (isBrowser) {
        var userJsonString = storage.getItem(userInfoKey);
        var ghUserInfo = null;
        if (userJsonString && userJsonString.length) {
            var ghUserInfo = JSON.parse(userJsonString);
        }
        return ghUserInfo;
    } else {
        return null;
    }
}

export const logout = () => {
    window.alert('In logout: isBrowser: ' + isBrowser )
    const storage = isBrowser ? window.sessionStorage : null;
    if (isBrowser) {
        // storage.setItem("isLoggedIn", false)
        storage.removeItem(userInfoKey)
    //auth.logout()
    }
}