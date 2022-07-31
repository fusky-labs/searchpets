import styles from "@/styles/Base.module.scss"
import { IContainerProps } from "@/utils/Interfaces"
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
