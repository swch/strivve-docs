import React from 'react'

class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (typeof window !== 'undefined') {
            const userInfo = JSON.parse(window.localStorage.getItem('Strivve-docs-user-info'));
            if (!userInfo) {
                window.location.href = process.env.GH_AUTH_URI;
            }
        }
        return (null);
    }
}

export default Account
