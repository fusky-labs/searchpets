import type { AppProps } from "next/app"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { MDXProvider } from "@mdx-js/react"
import NextProgress from "next-progress"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/globals.scss"

import * as ga from "../../lib/ga"
import Layout from "@/components/Base/Layout"

config.autoAddCss = false

export default function SearchpetsApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: any) => ga.pageView(url)

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => router.events.off("routeChangeComplete", handleRouteChange)
  }, [router.events])

  return (
    <>
      <NextProgress color="#C084FC" options={{ showSpinner: false }} />
      <Layout>
        {router.pathname === "/about" ? (
          <MDXProvider>
            <Component {...pageProps} />
          </MDXProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </>
  )
}
