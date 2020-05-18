import React from 'react'
import { handleAuthentication } from "../../utils/auth"

const isBrowser = typeof window !== "undefined"

class GitHubCallback extends React.Component {
  componentDidMount() {
    //window.alert('gh_callback.js: componentDidMount, this.props.location: ' + JSON.stringify(this.props.location));
  }


  render() {
    //window.alert('in render(1) of gh_callback.js: ' + JSON.stringify(this.props.location));
    const userInfo = decodeURIComponent(this.props.location.search.split('=')[1]);
    if (isBrowser && userInfo != 'undefined') {
        //window.alert('in render(2) of gh_callback.js: ' + userInfo);
        handleAuthentication(userInfo);
        //window.localStorage.setItem('Strivve-docs-user-info', userInfo );
    } else {
        //window.alert('in render(3) of gh_callback.js: NO PARAMS, skipping:' + JSON.stringify(userInfo));
    }
    return (    <>
                </>
        );
  }
}

export default GitHubCallback
