import { IconProp } from "@fortawesome/fontawesome-svg-core"

export interface ILayoutProps {
  children?: React.ReactNode
}

export interface IContainerProps extends ILayoutProps {
  title?: string
  description?: string
  wrap?: boolean | undefined
}

export interface INavLinkProps {
  link?: string
  name?: string
  icon: IconProp
}

export interface IFooterLinkProps extends INavLinkProps {}

export interface RedisClient {
  comics?: string[]
  years: string[]
  characters: string[]
}
