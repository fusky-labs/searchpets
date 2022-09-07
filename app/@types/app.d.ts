/// <reference types="@fontawesome/fontawesome-svg-core" />

declare type ThemeOverrides = "light" | "dark" | ""

declare type OptionsCtxTypes = {
  theme?: ThemeOverrides
  highContrast?: boolean
  expandComics?: boolean
  animations?: boolean
  setTheme?: (theme: ThemeOverrides) => void
  setExpandComics?: (expandComics: boolean) => void
  setHighContrast?: (highContrast: boolean) => void
  setAnimations?: (animations: boolean) => void
}

declare type SidebarCtxTypes = {
  expanded: boolean
  marginSize: string
  setExpanded: (expanded: boolean) => void
  setMarginSize: (marginSize: string) => void
}

declare interface LayoutProps {
  children?: React.ReactNode
}

declare interface ContainerProps extends LayoutProps {
  title?: string
  description?: string
  wrap?: boolean | undefined
}

declare interface NavLinkProps {
  link?: string
  name?: string
  icon: IconProp
}

declare interface ComicItemProps {
  title?: string
  img: string
  link: string
  characters?: string[]
}

declare interface NavbarRootProps extends LayoutProps {}

declare interface SidebarItemProps {
  link?: string
  name?: string
  icon?: IconProp | any
  disabled?: boolean
  header?: string
  kofi?: boolean
  hideOnCollapse?: boolean
}
