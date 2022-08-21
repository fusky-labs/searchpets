import { useState } from "react"
import { ExpandSearchContext, OptionsContext } from "@/utils/Contexts"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect } from "react"

export default function Layout({ children }: ILayoutProps) {
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

    const expandScroll = () => {
      window.scrollY > 200 ? isExpanded(true) : isExpanded(false)
    }

    useEffect(() => {
      window.addEventListener("scroll", expandScroll)
      return () => window.removeEventListener("scroll", expandScroll)
    }, [])
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
      <ExpandSearchContext.Provider value={{ expanded: expand }}>
        <Navbar />
      </ExpandSearchContext.Provider>
      {children}
      <Footer />
    </OptionsContext.Provider>
  )
}
