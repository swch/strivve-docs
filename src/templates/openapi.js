import React from 'react'
import { graphql } from 'gatsby'
import _ from 'lodash';

import {Layout} from '../components/index';
import {toStyleObj, safePrefix, Link, htmlToReact} from '../utils';

const backStyle = {
  marginBottom: '1rem',
}

export default class OpenApiView extends React.Component {
  //                         <Specs specs={specs} />

    render() {
        //const specs = this.props.data.allOpenApiSpec.edges.map(e => e.node)
        //const api = this.props.data.openApiSpec      //.edges.map(e => e.node)
        //console.log('this.props: ' + JSON.stringify(this.props));
        //const paths = api.childrenOpenApiSpecPath
        //const pathGroups = groupBy(paths, p => p.tag)


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
                    </div>
                  </div>
                </div>
              </article>
            </Layout>
        );
    }

//<Api />
    
/*return (
    <div>
      <h2>Specs</h2>
      <Specs specs={specs} />
      <hr />
    </div>
  )*/
}