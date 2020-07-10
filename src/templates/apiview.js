import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {htmlToReact} from '../utils';


export default class ApiView extends React.Component {
  render() {
    return (
        <Layout {...this.props}>
          <div className="outer">
                <div className="post">
                        {htmlToReact(_.get(this.props, 'pageContext.html'))}
                </div>
          </div>
        </Layout>
    );

  }
}
