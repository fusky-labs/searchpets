import { useContext } from "react"
import styles from "./Base.module.scss"
import Head from "next/head"
import SidebarMenu, { SidebarMobile } from "./Sidebar"
import { SidebarContext } from "@/utils/Contexts"
import { isMobile } from "react-device-detect"

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
      <SidebarMobile />
      <SidebarMenu />
      <div className={isWrap}>
        <div
          id={styles["sidebar-fill"]}
          style={{ width: `${marginSize}px` }}
        ></div>
        <main>{children}</main>
      </div>
    </>
  )
}
