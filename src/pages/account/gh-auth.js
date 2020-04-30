import React from 'react'
import { navigate } from 'gatsby'
import { handleAuthentication } from '../../services/auth'


import Layout from '../../components/Layout'

export default () => {
  handleAuthentication(() => navigate('/'))

  return (
    <Layout>
      <p>Logging you in...</p>
    </Layout>
  )
}