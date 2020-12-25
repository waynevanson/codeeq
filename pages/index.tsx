// welcome to the home page, this is how it works. press this button to get started!
// sending you to that page now.
import * as React from "react"
import * as lib from "../lib"

export const Home: React.FC = () => {
  lib.useTitle("Home")
  return (
    <div>
      <p>Welcome to the home page!</p>
      <p>
        We're still in development, but post it online anyway just to make sure
        it deploys.
      </p>
      <p>I definitely dislike when an app is built but it won't deploy.</p>
      <p>
        The purpose of this application is so existing devs can learn new
        languages.
      </p>
    </div>
  )
}

export default Home
