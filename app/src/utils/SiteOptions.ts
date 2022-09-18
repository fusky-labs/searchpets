export function themeHandler(theme: ThemeOverrides = "") {
  if (typeof window !== "undefined") {
    document.body.setAttribute("theme-override", theme)
    localStorage.setItem("theme-override", theme)
  }
}

export function contrastHandler(contrast: boolean = false) {
  if (typeof window !== "undefined") {
    document.body.setAttribute("high-contrast", contrast.toString())
    localStorage.setItem("high-contrast", contrast.toString())
  }
}
