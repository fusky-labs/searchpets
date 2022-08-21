import styles from "@/styles/base/Base.module.scss"
import Head from "next/head"

export default function Container({
  title,
  description,
  children,
  wrap
}: IContainerProps) {
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
      {wrap ? (
        <main role="main" className={styles.wrapper}>
          {children}
        </main>
      ) : (
        <main role="main">{children}</main>
      )}
    </>
  )
}
