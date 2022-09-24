import styles from "@/styles/base/Navbar.module.scss"

export function NavbarRoot({ children }: NavbarRootProps) {
  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles["nav-container"]}>{children}</div>
      </div>
    </header>
  )
}
