import React from 'react';
import {Layout, Contact} from '../components/index';

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
