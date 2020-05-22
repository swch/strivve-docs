<div style="text-align: center"><H1>CRUD Content Reference for Strivve Developer Documentation Site/App</H1></div>
<div style="text-align: center"><H3>Create, Update, Delete Content Reference</H3></div>


_This reference is written for those who need to merely add, move, reorganize or update content pages, imaes, videos, and other content within this site/project._

<div>&nbsp;</div>

****

<div>&nbsp;</div>

## File System Layout
In the gatsby-config.js node file, there is a proxy middleware NPM package we use to roxy rewrite the lambdas so they can be built and run locallly.  Below is the basic configuration, for more detals see this article ()
```javascript
const {
    createProxyMiddleware
} = require('http-proxy-middleware');
```
## Quick Start
+ Pages (markdown) are in the ./src/pages parent folder
+ Subsequent content is in subfolders under pages
+ Sidebar ordering is in YAML files in the ./src/data folder

## Gatsby Markdown
[Markdwon Syatx Reference](https://www.gatsbyjs.org/docs/mdx/markdown-syntax/)


# Local build and test cycle

        npm start

1. Browse to [http://localhost:8000/](http://localhost:8000/)

Hot relaoding works most of the time pretty well, depending on your host OS of course, if all you are changing is the content and updating existing scss styling.  However, due to the static site benefits of Gatsby and the aggressive cahing, you will need to `<CTRL-C>` and break out and run a __`$ gatsby clean`__ and then rerun __ `$ npm start` __ to update the site build and run it locally again.

#### All the things you don't need to care about
Gatsby can do just about anything you need it to, its not trivial however.  Here are things you will see in the project that you can freely dig into to understand, but if your goals are content focused, here are the things that you don't need to care about for now:
+ Gatsby Components - Gatsby wrapped React Components.  Components are reusble JSX react components, like a menu in a page, or the layout of the site, and pages, etc
+ Templates - Gatsby templates are JSX files that dictate the "view" of a markdown page and the transformation of the markdown into into HTML via React and other modules like plugins (GrahQL as an example of a plugin).
+ Gatsby Plugins - N/A
* 

For more information you can start here: (https://www.gatsbyjs.org/tutorial/part-one/)

    $ gatsby clean  -- cleans the publicand .cache folders of Gatsby
    $ npm start     -- full rebuild, cache is gone

***
