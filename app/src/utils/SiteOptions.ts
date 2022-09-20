export function themeHandler(theme: Theme) {
  if (typeof window !== "undefined") {
    document.body.setAttribute("data-theme-override", theme)
    localStorage.setItem("theme-override", theme)
  }
}

export function contrastHandler(contrast: boolean = false) {
  if (typeof window !== "undefined") {
    document.body.setAttribute("data-high-contrast", contrast.toString())
    localStorage.setItem("high-contrast", contrast.toString())
  }
}
