import { createContext } from "react"

export const ThemeContext = createContext<ThemeCtxTypes>({
  theme: null,
  toggleTheme: () => {},
})
