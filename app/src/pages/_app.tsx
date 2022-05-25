import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "../styles/globals.scss"
import "react-notifications-component/dist/theme.css"

config.autoAddCss = false

export default function SearchpetsApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
