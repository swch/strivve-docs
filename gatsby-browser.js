/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { silentAuth } from "./src/utils/auth"

import SwaggerUI from 'swagger-ui'
window.SwaggerUI = SwaggerUI;


// First time only, application/site load checks for authentication at startup
class SessionCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleCheckSession = () => {
    this.setState({ loading: false })
  }

  componentDidMount() {
    silentAuth(this.handleCheckSession)
  }

  render() {
    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    )
  }
}

export const wrapRootElement = ({ element }) => {
  return <SessionCheck>{element}</SessionCheck>
}

export const onInitialClientRender = () => {
    if ('onGatsbyInitialClientRender' in window && typeof window.onGatsbyInitialClientRender === 'function') {
        window.onGatsbyInitialClientRender();
    }
};

export const onRouteUpdate = ({ location, prevLocation }) => {
    //console.log('PATHNAME: ' + location.pathname);
    const skipPaths = ['/cb', 'swagger-api'];
    var skipPath = false;
    
    if ('onGatsbyRouteUpdate' in window && typeof window.onGatsbyRouteUpdate === 'function') {
        for (var i = 0; i < skipPaths.length; ++i) {
            if (location && location.pathname && location.pathname.indexOf(skipPaths[i]) !== -1) {
                skipPath = true;
            }
        }
        if (!skipPath) {
            window.onGatsbyRouteUpdate();
        }
    }

};

export const onClientEntry = () => {
    // See: https://curtistimson.co.uk/post/gatsbyjs/add-body-class-gatsbyjs-fouc/
  window.addEventListener('load', () => {
    document.body.className = document.body.className.replace(/\bno-js\b/, '');
  });
};