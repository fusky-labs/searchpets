import Link from "next/link"

interface SPLinkProps extends Omit<ClickableUI, "aria-label" | "onClick"> {
  href?: string
}

export default function SPLink(props: SPLinkProps) {
  return <Link href={props.href ?? ""}>{props.children}</Link>
}
