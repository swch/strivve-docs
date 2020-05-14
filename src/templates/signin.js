import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {toStyleObj, safePrefix} from '../utils';

export default class SignIn extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              <header className="page-header bg-gradient outer">
                {_.get(this.props, 'pageContext.frontmatter.img_path') && 
                <div className="bg-img" style={toStyleObj('background-image: url(\'' + safePrefix(_.get(this.props, 'pageContext.frontmatter.img_path')) + '\')')}/>
                }
                <div className="inner-small">
                  <h1 className="page-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                  {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                  <p className="page-subtitle">{_.get(this.props, 'pageContext.frontmatter.subtitle')}</p>
                  }
                </div>
              </header>
              <div className="outer">
                <div className="inner-medium">
                  <div className="post-feed">
                  </div>
              </div>
            </div>
            </Layout>
        );
    }
}
