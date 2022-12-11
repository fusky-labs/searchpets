import styles from "./Button.module.scss"

export function Button(props: ClickableUI<HTMLButtonElement>) {
  const isTransparent = props.transparent ? styles["btn-transparent"] : ""

  const detectClassName = !props.className
    ? isTransparent
    : `${isTransparent} ${props.className}`

  return (
    <button
      aria-label={props["aria-label"]}
      onClick={props.onClick}
      className={detectClassName}
    >
      {props.children}
    </button>
  )
}
