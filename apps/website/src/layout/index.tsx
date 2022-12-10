import Navbar from "../components/Navbar"

interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  )
}
