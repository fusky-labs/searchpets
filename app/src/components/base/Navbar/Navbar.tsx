import { NavbarRoot } from "./NavbarRoot"
import { LogoNav } from "./LogoNav"
import Options from "../Options"
import SearchBox from "./SearchBox"

export default function Navbar() {
  return (
    <NavbarRoot>
      <LogoNav />
      <SearchBox />
      <Options />
    </NavbarRoot>
  )
}
