import { useState, useEffect } from "react"
import { SidebarContext, OptionsContext } from "@/utils/Contexts"
import Navbar from "./Navbar"
import BackToTopBtn from "../BackToTopBtn"
import SidebarMenu from "../navigation/SidebarMenu"

export default function Layout({ children }: LayoutProps) {
  // Options state
  const [theme, toggleTheme] = useState<ThemeOverrides>("")
  const [contrast, toggleContrast] = useState(false)
  const [animations, toggleAnimations] = useState<boolean>()

  // Navbar state
  const [expand, isExpanded] = useState(false)

  if (typeof window !== "undefined") {
    const themeHandler = (theme: ThemeOverrides) => {
      document.body.setAttribute("theme-override", theme)
      localStorage.setItem("theme-override", theme)
    }

    const contrastHandler = (contrast: boolean) => {
      document.body.setAttribute("high-contrast", contrast.toString())
      localStorage.setItem("high-contrast", contrast.toString())
    }

    themeHandler("")
    contrastHandler(false)
  }

  return (
    <OptionsContext.Provider
      value={{
        theme,
        setTheme: toggleTheme,
        highContrast: contrast,
        setHighContrast: toggleContrast,
        animations,
        setAnimations: toggleAnimations
      }}
    >
      <BackToTopBtn />
      <SidebarContext.Provider value={{ expanded: expand }}>
        <Navbar />
      </SidebarContext.Provider>
      <SidebarMenu />
      {children}
    </OptionsContext.Provider>
  )
}
