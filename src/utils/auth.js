// src/utils/auth.js
import {
    navigate
} from "gatsby"

const isBrowser = typeof window !== "undefined"
const userInfoKey = 'Strivve-docs-user-info';

export const isAuthenticated = () => {
    if (!isBrowser) {
        return;
    }
    //window.alert('In isAuthenticated: ')

    var ghUserInfo = getProfile();
    return (ghUserInfo !== null);
}

export const login = (userInfo) => {
    //window.alert('In login: isBrowser: ' + isBrowser )
    //window.alert('In login: typeof(userInfo): ' + typeof(userInfo) )
    //window.alert('In login: isBrowser: ' + isBrowser + '  userInfo: ' + userInfo )
    if (isBrowser && (typeof(userInfo) == 'string')) { // stringified object
        //window.alert('In login: Calling setSession')
        setSession(false, userInfo);
        setTimeout( navigate, 300, '/');
    }
    return;
}

function setSession(bIsLoggedIn, authResult) {
    const storage = isBrowser ? window.sessionStorage : null;
    
    //window.alert('In auth.js: setSession: bIsLoggedIn: ' + bIsLoggedIn + ' - authResult: ' + authResult )
    if (!bIsLoggedIn && authResult) {
        storage.setItem(userInfoKey, authResult );
    }
    return
}

export const silentAuth = callback => {
    var bIsAuthenticated = isAuthenticated();
    //window.alert('In silentAuth: isAuthenticated: ' + bIsAuthenticated )
    if (bIsAuthenticated) return callback()
    // redirect to account sign in page
    var cbReturn = callback();
    navigate('/signin');

    if (cbReturn) return cbReturn;
}

export const getProfile = () => {
    const storage = isBrowser ? window.sessionStorage : null;
    if (isBrowser) {
        var userJsonString = storage.getItem(userInfoKey);
        var ghUserInfo = null;
        if (userJsonString && userJsonString.length) {
            ghUserInfo = JSON.parse(userJsonString);
        }
        return ghUserInfo;
    } else {
        return null;
    }
}

export const logout = () => {
    const storage = isBrowser ? window.sessionStorage : null;
    if (isBrowser) {
        //window.alert('In logout: isBrowser: ' + isBrowser )
        // storage.setItem("isLoggedIn", false)
        storage.removeItem(userInfoKey)
        navigate('/');
    //auth.logout()
    }
}