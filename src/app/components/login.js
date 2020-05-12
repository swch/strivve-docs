import React from "react"
import { navigate } from "gatsby"

/*import {
  IdentityModal,
  useIdentityContext,
} from "react-netlify-identity-widget"*/

function Login() {
  //const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  window.alert('In Login.js');
  return (
    <>
      <h1>Log in</h1>
      <button>log in</button>
    </>
  )
}

export default Login

/*      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={user => navigate("/app/profile")}
        onSignup={user => navigate("/app/profile")}

*/