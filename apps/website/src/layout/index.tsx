import dynamic from "next/dynamic"

const Navbar = dynamic(() =>
  import("../components/Base").then((base) => base.Navbar)
)
const Footer = dynamic(() =>
  import("../components/Base").then((base) => base.Footer)
)

export default function Layout(props: ChildrenNode) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  )
}
