import { useState, useEffect } from "react"
import { SidebarContext, OptionsContext, ModalContext } from "@/utils/Contexts"
import Navbar from "./Navbar"
import BackToTopBtn from "../BackToTopBtn"
import ModalBase from "../modals/ModalBase"

export default function Layout({ children }: LayoutProps) {
  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const ModalValues = { modalOpen, setModalOpen }

  // Sidebar state
  const [expand, setExpanded] = useState(false)
  const [margin, setMargin] = useState("69")
  const SidebarValues = {
    expanded: expand,
    setExpanded,
    marginSize: margin,
    setMarginSize: setMargin
  }

  // Options state
  const [theme, toggleTheme] = useState<ThemeOverrides>("")
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

  if (typeof window !== "undefined") {
    !modalOpen
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden")
  }

  return (
    <OptionsContext.Provider value={OptionsValue}>
      <ModalContext.Provider value={ModalValues}>
        <ModalBase hidden={!modalOpen} heading="yes" />
        <BackToTopBtn />
        <SidebarContext.Provider value={SidebarValues}>
          <Navbar />
          {children}
        </SidebarContext.Provider>
      </ModalContext.Provider>
    </OptionsContext.Provider>
  )
}
