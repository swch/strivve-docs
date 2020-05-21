import React from 'react'
import { login } from "../../utils/auth"

const isBrowser = typeof window !== "undefined"

class GitHubCallback extends React.Component {
  componentDidMount() {
    //window.alert('gh_callback.js: componentDidMount, this.props.location: ' + JSON.stringify(this.props.location));
  }


  render() {
    const userInfo = decodeURIComponent(this.props.location.search.split('=')[1]);
    if (isBrowser && userInfo !== 'undefined') {
        login(userInfo);
    }
    return (    <>
                </>
        );
  }
}

export default GitHubCallback
