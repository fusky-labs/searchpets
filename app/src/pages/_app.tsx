import type { AppProps } from "next/app"
import { useEffect } from "react"
import { useRouter } from "next/router"

import { MDXProvider } from "@mdx-js/react"

import { config, library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import Layout from "@/components/base/Layout"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/globals.scss"

import * as ga from "../../lib/ga"

config.autoAddCss = false

library.add(fab)
library.add(fas)

export default function SearchpetsApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: any) => ga.pageView(url)

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => router.events.off("routeChangeComplete", handleRouteChange)
  }, [router.events])

  return (
    <Layout>
      <MDXProvider>
        <Component {...pageProps} />
      </MDXProvider>
    </Layout>
  )
}
