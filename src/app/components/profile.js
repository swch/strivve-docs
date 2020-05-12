import React from "react"

//import { useIdentityContext } from "react-netlify-identity-widget"
const Profile = () => {
  //const { user } = useIdentityContext()
  	window.alert('In Profile.js');
	return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: </li>
        <li>E-mail: </li>
      </ul>
    </>
  )
}

export default Profile
