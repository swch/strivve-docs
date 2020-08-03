import React from 'react';
import _ from 'lodash';

import {Layout, Contact} from '../components/index';
import {htmlToReact} from '../utils';


export default class SandboxRequest extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              <div className="outer">
                <div className="inner">
                  <div className="docs-content">
                    <article className="post type-docs">
                      <div className="post-inside">
                        <div className="post-content">
                          {htmlToReact(_.get(this.props, 'pageContext.html'))}

                          <Contact />
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
