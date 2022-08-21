import { createContext } from "react"

export const OptionsContext = createContext<OptionsCtxTypes>({
  theme: "",
  highContrast: false,
  animations: true,
  setTheme: () => {},
  setHighContrast: () => {},
  setAnimations: () => {}
})

export const ExpandSearchContext = createContext<ExpandSearchCtxTypes>({
  expanded: false
})
