import { createContext } from "react"

export const OptionsContext = createContext<OptionsCtxTypes>({
  theme: "unset",
  expandComics: false,
  highContrast: false,
  animations: true,
  setTheme: () => {},
  setExpandComics: () => {},
  setHighContrast: () => {},
  setAnimations: () => {}
})

export const SidebarContext = createContext<SidebarCtxTypes>({
  expanded: false,
  marginSize: "0",
  setExpanded: () => {},
  setMarginSize: () => {}
})

export const ModalContext = createContext<ModalCtxTypes>({
  modalOpen: false,
  setModalOpen: () => {}
})
