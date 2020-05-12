import React from "react"
import { Router } from "@reach/router"

import {Layout} from '../components/index';

/*import AppLayout from './components/applayout';

import Profile from "./components/profile"
import NavBar from "./components/NavBar"
import Main from "./components/main"
import PrivateRoute from "./components/PrivateRoute"
import Login from "./components/login"*/

const App = () => {
  return (
		<Layout {...this.props}>
			<Router basepath="/app">
			</Router>
		</Layout>
  )
}

function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App

/*const App = () => {
  return (
    <>
      <NavBar />
      <Profile />
      <Main />
      <Router basepath="/app">
        <PrivateRoute path="/app/profile" component={`Profile`} />
        <PrivateRoute path="/" component={`Main`} />
        <Login path="/app/login" />
      </Router>
    </>
  )
}
*/