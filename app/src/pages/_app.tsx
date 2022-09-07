import type { AppProps } from "next/app"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { MDXProvider } from "@mdx-js/react"
import { config, library } from "@fortawesome/fontawesome-svg-core"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  faFilter,
  faSearch,
  faDisplay,
  faCog,
  faTrash,
  faUniversalAccess,
  faLink,
  faBars,
  faDownload,
  faHistory,
  faInfoCircle,
  faList,
  faCode,
  faScaleBalanced
} from "@fortawesome/free-solid-svg-icons"
import Layout from "@/components/base/Layout"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/globals.scss"

import * as ga from "../../lib/ga"

config.autoAddCss = false

library.add(faGithub)
library.add(
  faFilter,
  faSearch,
  faDisplay,
  faCog,
  faTrash,
  faUniversalAccess,
  faLink,
  faBars,
  faDownload,
  faHistory,
  faInfoCircle,
  faList,
  faCode,
  faScaleBalanced
)

export default function SearchpetsApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: any) => ga.pageView(url)

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => router.events.off("routeChangeComplete", handleRouteChange)
  }, [router.events])

  if (router.pathname === "/about") {
    return (
      <Layout>
        <MDXProvider>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    )
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
