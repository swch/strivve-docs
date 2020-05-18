import React, { Component } from "react"
import { Router } from "@reach/router"
import _ from 'lodash';
import {safePrefix} from '../utils';
import {Helmet} from 'react-helmet';

import Layout from "../components/Layout"
//import Profile from "../components/Profile"
//import Details from "../components/Details"
//import Login from "../components/Login"
//import PrivateRoute from "../components/PrivateRoute"
//import Status from "../components/Status"

import Header from '../components/Header';
import Footer from '../components/Footer';
import favicon from '../../static/images/favicon-96x96.png';

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'pageContext.frontmatter.title') && _.get(this.props, 'pageContext.frontmatter.title') + ' - '}{_.get(this.props, 'pageContext.site.siteMetadata.title')}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i%26Display=swap" rel="stylesheet"/> 
                    <link rel="stylesheet" href={safePrefix('assets/css/main.css')}/>
					<link rel="icon" href={favicon} />
                </Helmet>
                <div id="page" className="site">
                  <Header {...this.props} />
                  <main id="content" className="site-content">
                    {this.props.children}
                  </main>
                  <Footer {...this.props} />
                </div>
            </React.Fragment>
        )
    }
}



/*

const App = () => (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'pageContext.frontmatter.title') && _.get(this.props, 'pageContext.frontmatter.title') + ' - '}{_.get(this.props, 'pageContext.site.siteMetadata.title')}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i%26Display=swap" rel="stylesheet"/> 
                    <link rel="stylesheet" href={safePrefix('assets/css/main.css')}/>
					<link rel="icon" href={favicon} />
                </Helmet>
                <div id="page" className="site">
                  <Header {...this.props} />
                  <main id="content" className="site-content">
                    {this.props.children}
                  </main>
                  <Footer {...this.props} />
                </div>
            </React.Fragment>
)




const App = () => (
  <Layout>
    //<Status />
    <Router>
      //<PrivateRoute path="/app/details" component={Details} />
      //<PrivateRoute path="/app/profile" component={Profile} />
      //<Login path="/app/login" />
    </Router>
  </Layout>
)
*/
