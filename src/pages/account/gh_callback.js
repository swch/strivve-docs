import React from 'react'

class GitHubCallback extends React.Component {
  render() {
    //window.alert('in componentDidMount() of gh_callback.js: ' + JSON.stringify(this.props.location.search));
    if (typeof window !== 'undefined') {
        const userInfo = decodeURIComponent(this.props.location.search.split('=')[1]);
        window.localStorage.setItem('Strivve-docs-user-info', userInfo );
        window.location.href = '/';
    }
    return (null)
  }
}

export default GitHubCallback
