import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {toStyleObj, safePrefix, Link, htmlToReact} from '../utils';

export default class SignIn extends React.Component {
    render() {
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
                      {htmlToReact(_.get(this.props, 'pageContext.html'))}
                      <p className="read-more"><a href={process.env.GH_AUTH_URI} className="read-more-link post-subtitle">Sign In via GitHub Now... <span className="icon-arrow-right" aria-hidden="true" /></a></p>
                    </div>
                  </div>
                </div>
              </article>
            </Layout>
        );
    }
}
