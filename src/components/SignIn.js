import React, { useState, useEffect } from "react";
const fetch = require("node-fetch").default;

export const signIn = typeof window !== 'undefined';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		user: false,
		authUserData: []
    };

    this.signIn = signIn;
  }

/*  useEffect(() => {
    // get data from GitHub api
    fetch("http://localhost:8000/.netlify/lambdas/auth", {
      mode: "no-cors",
	  redirect: "follow"
	})
	.then(response => response.json())
	.then(console.log('fetch response: ', response))
	.catch((error) => {
      console.log('Fetch /auth Error', error.message)
      console.log(error)
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message,
        })
      })
    });
	
  }, [])*/

  async componentDidMount() {
	  
  	/*fetch("http://localhost:8000/.netlify/lambdas/auth", {
      mode: "no-cors",
	  redirect: "follow"
	})
	.then(response => response.json())
	.then(console.log('fetch response: ', response))
	.catch((error) => {
      console.log('Fetch /auth Error', error.message)
      console.log(error)
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message,
        })
      })
    })*/

    //const authClient = this.signIn.authClient;
    //const session = await authClient.session.get();
    //window.alert('in componentDidMount() of SignIn.js');
    // Session exists, show logged in state.
    /*if (session.status === 'ACTIVE') {
      // clear parameters from browser window
      window.location.hash = '';
      // set username in state
      this.setState({user: session.login});
      localStorage.setItem('isAuthenticated', 'true');
      // get access and ID tokens
      authClient.token.getWithoutPrompt({
        scopes: ['openid', 'email', 'profile'],
      }).then((tokens) => {
        tokens.forEach(token => {
          if (token.idToken) {
            authClient.tokenManager.add('idToken', token);
          }
          if (token.accessToken) {
            authClient.tokenManager.add('accessToken', token);
          }
        });

        // Say hello to the person who just signed in
        authClient.tokenManager.get('idToken').then(idToken => {
          console.log(`Hello, ${idToken.claims.name} (${idToken.claims.email})`);
          window.location.reload();
        });
      }).catch(error => console.error(error));
      return;
    } else {
      this.signIn.remove();
    }
    this.signIn.renderEl({el: '#signIn'})*/
  }

  render() {
    return (
      <div id="signIn"/>
    )
  }
}

/*
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {Helmet} from 'react-helmet';
import {safePrefix} from '../../utils';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import favicon from '../../../static/images/favicon-96x96.png';

import components, {Layout} from '../../components/index';
//import {toStyleObj, safePrefix, markdownify, htmlToReact} from '../../utils';
//import { getCurrentUser, isLoggedIn, logout, handleAuthentication } from "../../services/signin"

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authUserData: []
		};
	}
	async componentDidMount() {
		window.alert('in componentDidMount()');
		const userInfo = await fetch(`http://localhost:8000/.netlify/lambdas/auth`)
		.then(response => response.json()) // parse JSON from request
		.then(resultData => {
			console.log('resultData: ', resultData);
			// Set auth data
		})
	}

    render() {
		const { authUserData } = this.state;
        return (
            <React.Fragment>
				<Layout {...this.props}>
				</Layout>
            </React.Fragment>
        );
    }
}

export default SignIn
*/