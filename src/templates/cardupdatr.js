import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import DocsMenu from '../components/DocsMenu';
import {htmlToReact, toStyleObj} from '../utils';

const isBrowser = typeof window !== "undefined"

export default class CardUpdatr extends React.Component {
    componentDidMount() {
        if (isBrowser) {
            window.initCardupdatr( 'cardupdatr-frame', 'https://vloomba.cardupdatr.app/');
        }
    }

    render() {
      window.initCardupdatr = function (app_container_id, hostname, username) {
          const cardupdatr_app_container = document.getElementById(app_container_id);
          // Create an iFrame to load in to the container.
          const cardupdatr_iframe = document.createElement("iframe");
          const stylesheet = document.styleSheets[0];
          // Set up the required properties on the iFrame element (no scroll, transparency, border, id);
          cardupdatr_iframe.id = "cardupdatr-app";
          cardupdatr_iframe.style.border = "none";
          cardupdatr_iframe.allowtransparency = "true";
          cardupdatr_iframe.scroll = "no";
          cardupdatr_iframe.style.margin = 0;
          cardupdatr_iframe.style.padding = 0;
          cardupdatr_iframe.style.minHeight = "100vh";
          cardupdatr_iframe.style.width = "100%"

          // Set up the onload, which dynamically adjusts the height according to the document.
          window.addEventListener('message', function (e) {
              var eventName = e.data[0];
              var data = e.data[1];
              switch (eventName) {
                  case 'setHeight':
                      cardupdatr_iframe.style.height = data + "px";
                      break;
                  case 'setTrace':
                      console.log("set trace")
                      window.location.hash = data;
              }
          }, false);
          // Append the iFrame to the supplied container div.
          cardupdatr_app_container.appendChild(cardupdatr_iframe);
          // Conditional loading of the source.
          let app_source;
          if (hostname) {
              app_source = hostname;
          } else {
              app_source = "/"; // This should never happen based on the assumption that it'll be hosted on their domain. But for our own testing on staging/acme/etc. this will work.
          }
          if (username) {
              if (window.location.hash === "") {
                  window.location.hash = "trace=" + username;
              } else {
                  window.location.hash += "&trace=" + username;
              }
          }
          cardupdatr_iframe.src = app_source + "index.html#no-header&terms"; // Set the source of the iFrame
      }
    return (
        <Layout {...this.props}>
          <div className="outer">
            <div className="inner">
              <div className="docs-content">
                    <article className="post page post-full">
                      <div className="post-inside">
                        <div className="post-content">
                         {htmlToReact(_.get(this.props, 'pageContext.html'))}
                        </div>
                <div class="container" style={toStyleObj("background-color: deepskyblue; width: 100%; text-align: center; padding-top: 3vh; min-height: 100vh;")}>
                    <div class="cardupdatr-frame" id="cardupdatr-frame"></div>
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
