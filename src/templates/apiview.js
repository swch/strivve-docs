import React from 'react';
import _ from 'lodash';
import groupBy from 'lodash.groupby'

import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import {Layout} from '../components/index';
import DocsMenu from '../components/DocsMenu';
import {htmlToReact, getPages, Link, safePrefix} from '../utils';


export default class ApiView extends React.Component {
  render() {
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
                <div className="post type-docs">
                    <header className="post-header">
                      <h1 className="post-title line-left">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                    </header>
                        {htmlToReact(_.get(this.props, 'pageContext.html'))}
                </div>
              </div>
            </div>
          </div>
        </Layout>
    );

  }
}


/*
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

*/