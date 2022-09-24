import { useState } from "react"
import {
  SidebarContext,
  OptionsContext,
  ModalContext,
  SearchQueryContext
} from "@/utils/Contexts"
import Navbar from "./Navbar"
import BackToTopBtn from "./BackToTop/BackToTopBtn"
import ModalBase from "../modals/ModalBase"
import {
  themeHandler,
  contrastHandler,
  animationHandler
} from "@/utils/SiteOptions"
import SidebarMenu, { SidebarMobile } from "./Sidebar"
import Help from "../modals/Help"

export default function Layout({ children }: LayoutProps) {
  /**
   * Modal state
   */
  const [modalOpen, setModalOpen] = useState(false)
  const ModalValue = { modalOpen, setModalOpen }

  /**
   * Sidebar state
   */
  const [expand, setExpanded] = useState(false)
  const [margin, setMargin] = useState("78")
  const SidebarValues = {
    expanded: expand,
    setExpanded,
    marginSize: margin,
    setMarginSize: setMargin
  }

  /**
   * Options state
   */
  const [theme, toggleTheme] = useState<ThemeType>("unset")
  const [contrast, toggleContrast] = useState(false)
  const [animations, toggleAnimations] = useState<boolean>()
  const OptionsValue = {
    theme,
    setTheme: toggleTheme,
    highContrast: contrast,
    setHighContrast: toggleContrast,
    animations,
    setAnimations: toggleAnimations
  }

  themeHandler("unset")
  contrastHandler(false)
  animationHandler()

  /**
   * Search state
   */
  type SearchStateType = SearchCtxTypes["searchQuery"]

  const [searchQuery, setSearchQuery] = useState<SearchStateType>([])

  const SearchValues = {
    searchQuery,
    setSearchQuery
  }

  if (typeof window !== "undefined") {
    !modalOpen
      ? (document.body.style.overflowY = "auto")
      : (document.body.style.overflowY = "hidden")
  }

  return (
    <OptionsContext.Provider value={OptionsValue}>
      <ModalContext.Provider value={ModalValue}>
        <ModalBase
          hidden={!modalOpen}
          heading="Query terms"
          component={<Help />}
        />
        <SidebarContext.Provider value={SidebarValues}>
          <SearchQueryContext.Provider value={SearchValues}>
            <Navbar />
            <SidebarMobile />
            <SidebarMenu />
            {children}
          </SearchQueryContext.Provider>
        </SidebarContext.Provider>
        <BackToTopBtn />
      </ModalContext.Provider>
    </OptionsContext.Provider>
  )
}
