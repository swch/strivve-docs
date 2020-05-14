/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

exports.onInitialClientRender = () => {
    const userInfo = JSON.parse(window.localStorage.getItem('Strivve-docs-user-info'));
    if (!userInfo) {
        window.location.href = process.env.GH_AUTH_URI;
    }
}