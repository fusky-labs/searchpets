import { useContext } from "react"
import styles from "@/styles/base/Base.module.scss"
import Head from "next/head"
import lazy from "next/dynamic"
import SidebarMenu from "../navigation/Sidebar/SidebarMenu"
import { SidebarContext } from "@/utils/Contexts"

const MarginFiller = lazy(() => import("../MarginFiller.client"), {
  ssr: false
})

export default function Container({
  title,
  description,
  children,
  wrap
}: ContainerProps) {
  const isWrap = !wrap
    ? styles["nowrap-fixed"].toString()
    : styles["wrapper-fixed"].toString()

  const { marginSize } = useContext(SidebarContext)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <main role="main" className={isWrap}>
        <SidebarMenu />
        <MarginFiller size={marginSize} />
        {children}
      </main>
    </>
  )
}
