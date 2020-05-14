import React from 'react'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import { navigate, Router } from '@reach/router'
import { Link } from 'gatsby'
import Layout from "../../components/Layout"

const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    //return localStorage.getItem('isAuthenticated') === 'true';
	return false; //temp
  } else {
    return false;
  }
};

class GitHubCallback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {user: false};
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
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
    //window.alert('in componentDidMount() of gh_callback.js: ' + JSON.stringify(this.props.location.search));
    const userInfo = decodeURIComponent(this.props.location.search.split('=')[1]);
    window.localStorage.setItem('Strivve-docs-user-info', userInfo );
    window.location.href = '/';
    return (null)
  }
}

export default GitHubCallback
