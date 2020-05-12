import React from 'react'
import PropTypes from 'prop-types'
import { navigate, Router } from '@reach/router'
import { Link } from 'gatsby'
//import SignIn, { signIn } from '../../components/SignIn'
import Layout from "../../components/Layout"

const fetch = require("node-fetch").default;

const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    //return localStorage.getItem('isAuthenticated') === 'true';
	return false; //temp
  } else {
    return false;
  }
};

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {user: false};
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    //window.alert('in componentDidMount() of account.js');
  }

  logout() {
    /*signIn.authClient.signOut().catch((error) => {
      console.error('Sign out error: ' + error)
    }).then(() => {
      localStorage.setItem('isAuthenticated', 'false');
      this.setState({user: false});
      navigate('/');
    });*/
  }

  render() {
    const { data } = this.props;

	/*fetch("/.netlify/lambdas/auth", {
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
	
    if (!isAuthenticated()) {
    //window.alert('in render() of account.js - returning <SignIn/>');
		  /*return (
			<SignIn/>
		  );*/
    }

    return (
	  <Layout>
	  //await navigate(`/.netlify/lambdas/auth`)
	  </Layout>
    )
  }
}

export default Account
