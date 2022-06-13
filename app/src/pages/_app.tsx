import type { AppProps } from "next/app"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "../styles/globals.scss"
import "react-notifications-component/dist/theme.css"

import * as ga from "../../lib/ga"

config.autoAddCss = false

export default function SearchpetsApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => router.events.off("routeChangeComplete", handleRouteChange)
  }, [router.events])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
