import { useState, useEffect } from "react"
import { SidebarContext, OptionsContext } from "@/utils/Contexts"
import Navbar from "./Navbar"
import BackToTopBtn from "../BackToTopBtn"

export default function Layout({ children }: LayoutProps) {
  // Options state
  const [theme, toggleTheme] = useState<ThemeOverrides>("")
  const [contrast, toggleContrast] = useState(false)
  const [animations, toggleAnimations] = useState<boolean>()

  // Navbar state
  const [expand, setExpanded] = useState(false)
  const [margin, setMargin] = useState("69")

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
      <SidebarContext.Provider
        value={{
          expanded: expand,
          setExpanded,
          marginSize: margin,
          setMarginSize: setMargin
        }}
      >
        <Navbar />
        {children}
      </SidebarContext.Provider>
    </OptionsContext.Provider>
  )
}
