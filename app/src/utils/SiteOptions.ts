function setAttributes(name: string, attr: any) {
  if (typeof window !== "undefined") {
    document.body.setAttribute(`data-${name}`, attr)
    localStorage.setItem(name, attr)
  }
}

export function themeHandler(theme: ThemeType) {
  setAttributes("theme-override", theme)
}

export function contrastHandler(contrast: boolean) {
  setAttributes("high-contrast", contrast)
}

export function animationHandler(animations?: boolean | undefined) {
  if (animations !== undefined) {
    setAttributes("animations", animations)
  }

  setAttributes("animations", "unset")
}
