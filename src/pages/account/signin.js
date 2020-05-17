import React from 'react'

class Account extends React.Component {
    render() {
        var ghUserInfo = JSON.parse(window.localStorage.getItem('Strivve-docs-user-info'));
        
        if (typeof window !== 'undefined') {
            const userInfo = JSON.parse(window.localStorage.getItem('Strivve-docs-user-info'));
            if (!ghUserInfo) {
                window.location.href = process.env.GH_AUTH_URI;
            }
        }
        return (null);
    }
}

export default Account
