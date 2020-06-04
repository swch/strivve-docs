// Swagger template
// https://github.com/devdigital/gatsby-source-openapi-aggregate
import React, { Component } from 'react'
import _ from 'lodash';


import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import {Layout} from '../components/index';
import DocsMenu from '../components/DocsMenu';
import {htmlToReact, getPages, Link, safePrefix} from '../utils';

//import Specs from '../swagger-spec/Specs'
import SpecPaths from '../swagger-spec/SpecPaths'
import SpecInformation from '../swagger-spec/SpecInformation'
import groupBy from 'lodash.groupby'

const backStyle = {
  marginBottom: '1rem',
}

class Api extends Component {
  render() {
    console.log('this.props: ' + JSON.stringify(this.props));
    const api = this.props.data.openApiSpec
    const paths = api.childrenOpenApiSpecPath
    const pathGroups = groupBy(paths, p => p.tag)

    let root_page_path = _.get(this.props, 'pageContext.site.data.doc_sections.root_folder') + 'index.md';
    let current_page_path = '/' + _.get(this.props, 'pageContext.relativePath');
    let child_pages_path = '/' + _.get(this.props, 'pageContext.relativeDir');
    let child_pages = _.orderBy(_.filter(getPages(this.props.pageContext.pages, child_pages_path), item => _.get(item, 'base') !== 'index.md'), 'frontmatter.weight');
    let child_count = _.size(child_pages);
    let has_children = (child_count > 0) ? true : false;
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
                    <div className="post-content">
                      <div>
                        <SpecInformation
                          title={api.title}
                          version={api.version}
                          description={api.description}
                        />
                        {Object.keys(pathGroups).map(t => (
                          <SpecPaths key={t} tag={t} paths={pathGroups[t]} />
                        ))}
                      </div>
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

Api.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Api

export const query = graphql`
  query IndexQuery {
    openApiSpec {
      version
      title
      description
      childrenOpenApiSpecPath {
        name
        verb
        operationId
        summary
        description
        fullPath
        parameters {
          name
          in
          description
          required
          type
          format
        }
        tag
        childrenOpenApiSpecResponse {
          id
          statusCode
          description
          childrenOpenApiSpecDefinition {
            name
            properties {
              name
              type
              description
              format
            }
          }
        }
      }
    }
  }
`