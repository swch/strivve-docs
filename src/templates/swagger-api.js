// Swagger template
// https://github.com/devdigital/gatsby-source-openapi-aggregate
import React, { Component } from 'react'
import _ from 'lodash';

import {Layout} from '../components/index';
import DocsMenu from '../components/DocsMenu';
import SwaggerDoc from '../components/SwaggerDoc';
import "../pages/docs/swagger-api/swagger-api.css"

class SwaggerApi extends Component {
  render() {
    return (
        <Layout {...this.props}>
          <div className="outer">
            <div className="inner">
              <div className="docs-content">
                <DocsMenu {...this.props} page={this.props.pageContext} site={this.props.pageContext.site} />
                <article className="post type-docs">
                  <div className="post-inside">
                    <header className="post-header">
                      <h1 className="post-title line-left">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                    </header>
                    <div id="swagger-element" className="post-content">
                        <SwaggerDoc />
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </Layout>
    );

  }
}

export default SwaggerApi