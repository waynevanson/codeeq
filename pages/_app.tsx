import { AppProps } from "next/app"
import Head from "next/head"
import * as React from "react"
import { PageTemplate } from "../components/page-template"
import "tailwindcss/tailwind.css"
import "../node_modules/highlight.js/styles/a11y-dark.css"

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <PageTemplate>
        <Component {...pageProps} />
      </PageTemplate>
    </React.Fragment>
  )
}
