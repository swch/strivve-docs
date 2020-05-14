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
