const Dotenv = require('dotenv-webpack')
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log('webpack functions using activeEnv: ' + activeEnv);
//console.log('process.env: ' + JSON.stringify(process.env))
//console.log('process.cwd: ' + process.cwd());

// @see https://github.com/netlify/netlify-lambda#webpack-configuration
module.exports = {
  plugins: [new Dotenv({
      path: './.env.' + activeEnv }
  )],
}
