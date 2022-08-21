declare type ThemeOverrides = "light" | "dark" | ""
declare type OptionsCtxTypes = {
  theme?: ThemeOverrides
  highContrast?: boolean
  animations?: boolean
  setTheme?: (theme: ThemeOverrides) => void
  setHighContrast?: (highContrast: boolean) => void
  setAnimations?: (animations: boolean) => void
}

declare type ExpandSearchCtxTypes = {
  expanded: boolean
}
