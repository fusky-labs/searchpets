import dynamic from "next/dynamic"
import { Navbar } from "@/components/Base"

// @ts-ignore
const Footer = dynamic(() =>
  import("../components/Base").then((base) => base.Footer)
)

export default function Layout(props: ChildrenSlot) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  )
}
