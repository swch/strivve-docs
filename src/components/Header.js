import React from 'react';
import _ from 'lodash';
import {Link, safePrefix} from '../utils';
import Menu from './Menu';
import { getProfile, isAuthenticated } from "../utils/auth"

var defaultUserInfo = {"avatar_url": "/images/favicon-96x96.png", "name": "Sign In", "link_to": process.env.GH_AUTH_URI};

export default class Header extends React.Component {
    render() {
        let menu = _.get(this.props, 'pageContext.menus.main');
        if (typeof window !== 'undefined') {
            var ghUserInfo = getProfile();
            if (ghUserInfo) { 
                ghUserInfo.link_to = "/signout";
            }
        }
        var userInfo = ghUserInfo || defaultUserInfo;
        if (typeof(userInfo.name) == 'undefined' || userInfo.name === null || userInfo.name.length === 0)
            userInfo.name = ghUserInfo.username;

        return (
            <header id="masthead" className="site-header outer">
              <div className="inner">
                <div className="site-header-inside">
                  <div className="site-branding">
                    {_.get(this.props, 'pageContext.site.data.header.logo_img') && 
                    <p className="site-logo">
                      <Link to={safePrefix(_.get(this.props, 'pageContext.site.data.header.url') || '/')}>
                        <img src={safePrefix(_.get(this.props, 'pageContext.site.data.header.logo_img'))} alt="Logo" />
                      </Link>
                    </p>
                    }
                    {(_.get(this.props, 'pageContext.frontmatter.template') === 'home') ? 
                    <h1 className="site-title"><Link to={safePrefix(_.get(this.props, 'pageContext.site.data.header.url') || '/')}>{_.get(this.props, 'pageContext.site.data.header.title')}</Link></h1>
                     : 
                    <p className="site-title"><Link to={safePrefix(_.get(this.props, 'pageContext.site.data.header.url') || '/')}>{_.get(this.props, 'pageContext.site.data.header.title')}</Link></p>
                    }
                  </div>
                  {(_.get(this.props, 'pageContext.menus.main') && _.get(this.props, 'pageContext.site.data.header.has_nav')) && <React.Fragment>
                  <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                    <div className="site-nav-inside">
                      <button id="menu-close" className="menu-toggle"><span className="screen-reader-text">Open Menu</span><span className="icon-close" aria-hidden="true" /></button>
                     {isAuthenticated() && <Menu {...this.props} menu={menu} menu_class={'menu'} page={this.props.pageContext} />}
                    </div>
                  </nav>
                  <button id="menu-open" className="menu-toggle"><span className="screen-reader-text">Close Menu</span><span className="icon-menu" aria-hidden="true" /></button>
                  </React.Fragment>}
                  <div className="site-navigation"><img className="docs-section-item social-links" width="36" height="36" src={userInfo.avatar_url} alt="GitHub User" /><Link to={userInfo.link_to}><center className="social-links">{userInfo.name}</center></Link></div>
                </div>
              </div>
            </header>
        );
    }
}
//                <div class="site-navigation"><img width="36" height="36" src={userInfo.avatar_url} alt="GitHub User" />{userInfo.name}</div>
