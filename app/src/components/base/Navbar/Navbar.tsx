import { useRouter } from "next/router"
import { NavbarRoot } from "./NavbarRoot"
import { LogoNav } from "./LogoNav"
import SearchBox from "../Searchbox/SearchBox"
import OptionsMenu from "../../navigation/Options/OptionsMenu"

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
