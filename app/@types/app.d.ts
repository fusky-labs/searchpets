// import type { IconProp } from "@fortawesome/fontawesome-svg-core"

declare type ThemeCtxTypes = {
  theme: string | null
  toggleTheme: any
}

declare type SearchLockCtxTypes = {
  searchLocked: boolean
  isSearchLock: any
}

declare interface ILayoutProps {
  children?: React.ReactNode
}

declare interface IContainerProps extends ILayoutProps {
  title?: string
  description?: string
  wrap?: boolean | undefined
}

declare interface INavLinkProps {
  link?: string
  name?: string
  icon: any
}

declare interface IFooterLinkProps extends INavLinkProps {}

declare interface IFilterItemProps {
  name: string | number
  yearType?: boolean | undefined
}

declare interface IComicItemProps {
  title?: string
  img: string
  characters?: string[]
}
