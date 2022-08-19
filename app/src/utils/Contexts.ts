import { createContext } from "react"

export const ThemeContext = createContext<ThemeCtxTypes>({
  theme: null,
  toggleTheme: () => {}
})

export const SearchLockContext = createContext<SearchLockCtxTypes>({
  searchLocked: false,
  isSearchLock: () => {}
})
