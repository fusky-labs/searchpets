import { useContext } from "react"
import styles from "./Base.module.scss"
import Head from "next/head"
import { SidebarContext } from "@/utils/Contexts"
import { useRouter } from "next/router"

export default function Container({
  title,
  description,
  children,
  wrap
}: ContainerProps) {
  const router = useRouter()

  const isWrap = !wrap
    ? styles["nowrap-fixed"].toString()
    : styles["wrapper-fixed"].toString()

  const { marginSize } = useContext(SidebarContext)

  const url = `https://searchpets.xyz${router.pathname}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="og:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <link rel="canonical" href={url} />
      </Head>

      <main role="main" className={isWrap}>
        <div
          id={styles["sidebar-fill"]}
          style={{ width: `${marginSize}px` }}
        ></div>
        <div className={styles.container}>{children}</div>
      </main>
    </>
  )
}
