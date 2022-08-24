import { createContext } from "react"

export const OptionsContext = createContext<OptionsCtxTypes>({
  theme: "",
  expandComics: false,
  highContrast: false,
  animations: true,
  setTheme: () => {},
  setExpandComics: () => {},
  setHighContrast: () => {},
  setAnimations: () => {}
})

export const ExpandSearchContext = createContext<ExpandSearchCtxTypes>({
  expanded: false
})
