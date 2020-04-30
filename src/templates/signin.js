import React from 'react';
import _ from 'lodash';

import components, {Layout} from '../components/index';
import {toStyleObj, safePrefix, htmlToReact} from '../utils';
import GitHubLogin from 'react-github-login';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

export default class SignIn extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              <article className="post page post-full">
                <header className="post-header bg-gradient outer">
                  {_.get(this.props, 'pageContext.frontmatter.img_path') && 
                  <div className="bg-img" style={toStyleObj('background-image: url(\'' + safePrefix(_.get(this.props, 'pageContext.frontmatter.img_path')) + '\')')}/>
                  }
                  <div className="inner-small">
                    <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                    {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                    <div className="post-subtitle">
                      {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                    </div>
                    }
                  </div>
                </header>
                <div className="outer">
                  <div className="inner-medium">
                    <div className="post-content">
                      {htmlToReact(_.get(this.props, 'pageContext.html'))}
                    </div>
                  </div>
                </div>
              </article>

			<GitHubLogin clientId="963d366d593be476d2d1" onSuccess={onSuccess} onFailure={onFailure} redirectUri="https://strivve-docs-8b1ae.netlify.app/gh-auth/done" />
            </Layout>
        );
    }
}
