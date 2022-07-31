import { ILayoutProps } from "@/utils/Interfaces"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({ children }: ILayoutProps) {
  return(
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
};
