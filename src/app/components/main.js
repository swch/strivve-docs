import React from "react"

const fetch = require("node-fetch").default;

//import { useIdentityContext } from "react-netlify-identity-widget"

function Main() {
 const [data, setData] = React.useState(null)
 const [loading, setLoading] = React.useState(false)
  //const { user } = useIdentityContext()
 const [err, setErr] = React.useState("")

  const handleClick = e => {
    e.preventDefault()
    setLoading(true)
    /*dfetch("/.netlify/lambdas/auth", {
      headers: {
		mode: "no-cors",
		redirect: "follow",
        Accept: "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        setLoading(false)
        setData(json)
      })
      .catch(err => {
        if (window.location.origin === "http://localhost:8000")
          setErr(
            'your origin is "http://localhost:8000". You are likely not using Netlify Dev so the functions server isnt running. Please read the docs, use Netlify Dev, and go to http://localhost:8888'
          )
        else setErr(err)
        throw err
      })*/
  }

  window.alert('In Main.js');
  return (
    <>
      <h1>Your Main App</h1>
      <ul>
        <li>API: </li>
        <li>ID: </li>
      </ul>
      <hr />

      <button onClick={handleClick}>
        Loading...
      </button>
    </>
  )
}

export default Main
