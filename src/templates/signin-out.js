import React from 'react';
import { navigate } from "gatsby"

import _ from 'lodash';

import {Layout} from '../components/index';
import {toStyleObj, safePrefix, htmlToReact} from '../utils';
import markvars from '../utils/markdown-vars';

import { getProfile, logout } from "../utils/auth"

export default class SignIn extends React.Component {
    // function to handle the click
    handleClick() {
        if (getProfile() == null) {
            window.location.href = process.env.GH_AUTH_URI;
        } else {
            logout();
            navigate('/signin');
        }
    }
    
    render() {
        var ctaButtonLabel = "fix me";
        var githubAppId = process.env.GH_CLIENT_ID;
        var appLoginUrl = process.env.GH_AUTH_URI;
        
        if (getProfile() !== null) {
            ctaButtonLabel = "Sign Out Now...";
        } else {
            ctaButtonLabel = "Sign In via GitHub Now...";
        }
        return (
            <Layout {...this.props}>
              <article className="post page post-full">
                <header className="post-header bg-gradient outer">
                  {_.get(this.props, 'pageContext.frontmatter.img_path') && 
                  <div className="bg-img" style={toStyleObj('background-image: url(\'' + safePrefix(_.get(this.props, 'pageContext.frontmatter.img_path')) + '\')')}/>
                  }
                  <div className="inner">
                    <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                    {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                     <div className="post-subtitle">
                      {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                    </div>
                    }
                  </div>
                </header>
                <div className="outer">
                  <div className="inner">
                    <div className="post-content">
                        {htmlToReact(markvars(_.get(this.props, 'pageContext.html'), {githubAppId}))}
                        <div className="block text-block"><div className="block-content"><button className="block-cta" onClick={this.handleClick} >{ctaButtonLabel}</button></div></div>
                    </div>
                  </div>
                </div>
              </article>
            </Layout>
        );
    }
}

// {htmlToReact(markvars(_.get(this.props, 'pageContext.html'), {ctaButtonHref}))}
// {htmlToReact(_.get(this.props, 'pageContext.html'))}
// dangerouslySetInnerHTML={{ __html: template(data.markdown.html, { URL }) }}