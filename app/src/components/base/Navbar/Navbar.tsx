import { useRouter } from "next/router"
import { NavbarRoot } from "./NavbarRoot"
import { LogoNav } from "./LogoNav"
import SearchBox from "./SearchBox"
import Options from "../Options"

export default function Navbar() {
  const router = useRouter()

  return (
    <NavbarRoot>
      <LogoNav />
      {router.pathname === "/" || router.pathname === "/about" ? null : (
        <SearchBox />
      )}
      <Options />
    </NavbarRoot>
  )
}
