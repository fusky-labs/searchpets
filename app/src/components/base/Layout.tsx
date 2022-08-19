import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from "react"
import { ThemeContext } from "@/utils/Contexts"

export default function Layout({ children }: ILayoutProps) {
  const [theme, toggleTheme] = useState<string>("unset")

  if (typeof window !== "undefined") {
    const themeHandler = (theme: string) => {
      document.body.setAttribute("theme-override", theme)
      localStorage.setItem("theme", theme)
    }

    themeHandler("unset")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Navbar />
      {children}
      <Footer />
    </ThemeContext.Provider>
  )
}
