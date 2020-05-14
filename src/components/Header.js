import React from 'react';
import _ from 'lodash';
import {Link, safePrefix} from '../utils';
import Menu from './Menu';

var userInfo = {"avatar_url": "/images/favicon-96x96.png", "userInfo.name": "Unknown"};

export default class Header extends React.Component {
    render() {
        let menu = _.get(this.props, 'pageContext.menus.main');
        if (typeof window !== 'undefined') {
            userInfo = JSON.parse(window.localStorage.getItem('Strivve-docs-user-info'));
        }

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
                      <Menu {...this.props} menu={menu} menu_class={'menu'} page={this.props.pageContext} />
                    </div>
                  </nav>
                  <button id="menu-open" className="menu-toggle"><span className="screen-reader-text">Close Menu</span><span className="icon-menu" aria-hidden="true" /></button>
                  </React.Fragment>}
                <div class="site-navigation">{userInfo.name}</div>
                </div>
              </div>
            </header>
        );
    }
}
//                <div class="site-navigation"><img width="36" height="36" src={userInfo.avatar_url} alt="GitHub User" />{userInfo.name}</div>
