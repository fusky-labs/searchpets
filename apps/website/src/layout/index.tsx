interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <header>Header compoennt</header>
      {props.children}
      <footer>Footer compoennt</footer>
    </>
  )
}
