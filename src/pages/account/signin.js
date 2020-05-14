import React from 'react'
import _ from 'lodash';

import {
    navigate,
    Router
} from '@reach/router'

import {
    Link
} from 'gatsby'

class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: false
        };
        //this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        window.alert('Doc body:', JSON.stringify(document.body));
        /*
                    // Set User Object in local storage
            window.localStorage.setItem('Strivve-docs-user-info', userInfo );
        

        const token = await signIn.authClient.tokenManager.get('idToken');
        if (token) {
          this.setState({user: token.claims.name});
        } else {
          // Token has expired
          this.setState({user: false});
          localStorage.setItem('isAuthenticated', 'false');
        }*/
    }

    render() {
        //if (!isAuthenticated()) {
        if (true) {
            window.location.href = process.env.GH_AUTH_URI;
        }
        return (null);
    }
}

export default Account
