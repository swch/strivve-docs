import React from 'react';
import _ from 'lodash';
import ScriptTag from 'react-script-tag';

import CardUpdatrMenu from '../components/CardUpdatrMenu';

import {Layout} from '../components/index';
import {htmlToReact, toStyleObj} from '../utils';

const isBrowser = typeof window !== "undefined"
const cardupdatrHostname = 'acmebank';
const cardupdatrUrl = 'https://' + cardupdatrHostname + '.cardupdatr.app/';
const cardupdatrJavascriptUrl = cardupdatrUrl + 'cardupdatr-client.js'
const iFrameClassID = 'cardupdatr-frame';

export default class CardUpdatr extends React.Component {
    componentDidMount() {
        if (isBrowser) {
            setTimeout(function(w) {
                    w.initCardupdatr( { "app_container_id": iFrameClassID, "hostname": cardupdatrUrl } );
                },
            1000, window);
        }
    }

    render() {
        return (
            <Layout {...this.props}>
              <div className="outer">
                <div className="inner">
                  <div className="docs-content">
                    <CardUpdatrMenu {...this.props} page={this.props.pageContext} site={this.props.pageContext.site} />
                    <article className="post type-docs">
                      <div className="post-inside">
                        <header className="post-header">
                          <h1 className="post-title line-left">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                        </header>                        
                        <div className="post-content">
                          {htmlToReact(_.get(this.props, 'pageContext.html'))}
                        </div>
                      </div>
                      <div className="container" style={toStyleObj("background-color: deepskyblue; width: 100%; text-align: center; padding-top: 3vh; min-height: 100vh;")}>
                        <ScriptTag src={cardupdatrJavascriptUrl} />
                        <div className={iFrameClassID} id={iFrameClassID}></div>
                      </div>
                    </article>
                    <nav id="page-nav" className="page-nav">
                      <div id="page-nav-inside" className="page-nav-inside sticky">
                        <h2 className="page-nav-title">Jump to Section</h2>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </Layout>
        );
  }
}
