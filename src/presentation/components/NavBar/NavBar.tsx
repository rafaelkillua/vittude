import { FC, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames/bind'

import logo from '@/presentation/assets/logo.png'
import { ReactComponent as IconWorld } from '@/presentation/assets/icons/world.svg'
import iconMenu from '@/presentation/assets/icons/menu.svg'
import styles from './NavBar.module.scss'

const cx = classNames.bind(styles)

export const NavBar: FC = () => {
  const [showMenu, setShowMenu] = useState(false)

  const renderMenu = useMemo(() => (
    <ul className={styles.menu}>
      <li className={styles.menuItem}>
        <a href="https://www.vittude.com/" className={styles.link}>Site institucional</a>
      </li>
      <li className={styles.menuItem}>
        <a href="https://www.vittude.com/blog/" className={styles.link}>Blog</a>
      </li>
      <li className={styles.menuItem}>
        <a href="" className={styles.link} title="Selecionar linguagem"><IconWorld /></a>
      </li>
    </ul>
  ), [])

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="Logo da Vittude" />

      <div className={styles.menuDesktop}>
        {renderMenu}
      </div>
      <div className={styles.menuMobile}>
        <img className={styles.menuMobileIcon} src={iconMenu} onClick={() => { setShowMenu(true) }} />
        <div className={cx(styles.bottomSheet, showMenu && styles.bottomSheetOpen)}>
          {showMenu && createPortal(<div className={styles.backdrop} onClick={() => { setShowMenu(false) }} />, document.body)}
          {renderMenu}
        </div>
      </div>
    </div>
  )
}