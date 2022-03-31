import AppHeader from "./AppHeader"
import AppFooter from "./AppFooter"

export default function Layout({ children }) {
  return (
    <>
      <AppHeader />
      <div>{children}</div>
      <AppFooter />
    </>
  )
}