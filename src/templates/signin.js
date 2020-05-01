import React from 'react';
import _ from 'lodash';

import components, {Layout} from '../components/index';
import {toStyleObj, safePrefix, markdownify, htmlToReact} from '../utils';
import GitHubLogin from 'react-github-login';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

export default class SignIn extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
	            <section id={_.get(this.props, 'section.section_id')} className="block cta-block outer">
				<div className="inner">
					<div className="block-inside">
						{_.get(this.props, 'section.image') && 
							<div className="block-preview">
								<img className="thumbnail" src={safePrefix(_.get(this.props, 'section.image'))} alt={_.get(this.props, 'section.title')} />
							</div>
						}
						<div className="block-content">
							<h2 className="block-title">{_.get(this.props, 'section.title')}</h2>
							<div className="block-text">
								{markdownify(_.get(this.props, 'section.content'))}
							</div>
								<div className="block-cta">
									<div className="block-item-cta">
										<GitHubLogin clientId="963d366d593be476d2d1" onSuccess={onSuccess} onFailure={onFailure} className="button" redirectUri="https://strivve-docs-8b1ae.netlify.app/gh-auth" />
									</div>
								</div>
						</div>
					</div>
				</div>
				</section>
            </Layout>
        );
    }
}
