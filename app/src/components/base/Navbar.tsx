import { useRouter } from "next/router"
import OptionsMenu from "../navigation/OptionsMenu"
import SearchBox from "./SearchBox"
import NavbarRoot from "./NavbarRoot"
import LogoNav from "./LogoNav"

export default function Navbar() {
  const router = useRouter()

  return (
    <NavbarRoot>
      <LogoNav />
      {router.pathname === "/" ||
      router.pathname === "/search" ||
      router.pathname === "/characters" ||
      router.pathname === "/chapters" ? (
        <SearchBox />
      ) : null}
      <OptionsMenu />
    </NavbarRoot>
  )
}
