import { useState, useEffect, useRef } from "react"
import styles from "./FAQItem.module.scss"

interface FAQItemProps {
  title: string
  children?: React.ReactElement
}

export default function FAQItem({ title, children }: FAQItemProps) {
  const [expand, setExpand] = useState(false)
  const faqRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleHeight =
    titleRef.current?.scrollHeight === undefined
      ? 26
      : titleRef.current?.scrollHeight

  return (
    <article
      ref={faqRef}
      className={
        !expand ? styles.root.toString() : styles["root-expand"].toString()
      }
      style={{
        height: !expand
          ? `calc(${titleHeight}px + 1.8rem)`
          : faqRef.current?.scrollHeight
      }}
    >
      <div
        className={styles.title}
        onClick={() => setExpand(!expand)}
        role="summary"
      >
        <h2 ref={titleRef}>{title}</h2>
      </div>
      <div className={styles.wrapper} role="details">{children}</div>
    </article>
  )
}
