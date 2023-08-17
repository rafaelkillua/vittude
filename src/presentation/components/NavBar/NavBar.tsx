import { FC } from 'react'

import logo from '@/presentation/assets/logo.png'
import iconWorld from '@/presentation/assets/world.svg'
import styles from './NavBar.module.scss'

export const NavBar: FC = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="Logo da Vittude" />

      <ul className={styles.menu}>
        <li>
          <a href="" className={styles.menuItem}>Site institucional</a>
        </li>
        <li>
          <a href="" className={styles.menuItem}>Blog</a>
        </li>
        <li>
          <a href="" className={styles.menuItem} title="Selecionar linguagem"><img src={iconWorld} alt="Linguagem" /></a>
        </li>
      </ul>
    </div>
  )
}