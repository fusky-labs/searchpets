/// <reference types="@fontawesome/fontawesome-svg-core" />

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
  icon: IconProp
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
