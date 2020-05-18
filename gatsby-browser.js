/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

/*exports.onInitialClientRender = () => {
    const userInfo = JSON.parse(window.localStorage.getItem('Strivve-docs-user-info'));
    if (!userInfo) {
        window.location.href = process.env.GH_AUTH_URI;
    }
}*/

import React from "react"

import { silentAuth } from "./src/utils/auth"

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