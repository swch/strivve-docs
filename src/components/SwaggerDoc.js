import React from 'react'
import jsonSpecObj from '../data/swagger.json'

class SwaggerDoc extends React.Component {
  componentDidMount() {
    window.SwaggerUI({
        dom_id: '#swagger',
        spec: jsonSpecObj,
        displayOperationId: false,
        deepLinking: true
    });
  }
  render() {
    return <div id="swagger" />
  }
}

export default SwaggerDoc
