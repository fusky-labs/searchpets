import styles from "./Button.module.scss"

interface ButtonProps {
  "children"?: React.ReactNode
  "onClick"?: () => void
  "transparent"?: boolean
  "disabled"?: boolean
  "aria-label"?: string
}

export default function Button(props: ButtonProps) {
  const isTransparent = styles[!props.transparent ? "" : "btn-transparent"]

  return (
    <button
      aria-label={props["aria-label"]}
      onClick={props.onClick}
      className={isTransparent}
    >
      {props.children}
    </button>
  )
}
