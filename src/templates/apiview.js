import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {toStyleObj, safePrefix, htmlToReact} from '../utils';

export default class ApiView extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              <article className="post page post-full">
                <header className="page-api-header bg-gradient outer">
                  {_.get(this.props, 'pageContext.frontmatter.img_path') && 
                  <div className="bg-img" style={toStyleObj('background-image: url(\'' + safePrefix(_.get(this.props, 'pageContext.frontmatter.img_path')) + '\')')}/>
                  }
                    <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                    {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                    <div className="post-subtitle">
                      {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                    </div>
                    }
                </header>
                <div className="outer">
                  {htmlToReact(_.get(this.props, 'pageContext.html'))}
                </div>
              </article>
            </Layout>
        );
    }
}
