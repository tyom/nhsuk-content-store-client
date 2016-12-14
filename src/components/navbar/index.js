import React from 'react';

import {Link} from 'react-router';
import styles from './styles.css';


export const Navbar = () => (
  <nav className={styles.Navbar}>
    <ul className={styles['Navbar-list']}>
      <NavbarItem path="/pages">Pages</NavbarItem>
    </ul>
  </nav>
);

export const NavbarItem = ({path, children}) => (
  <li className={styles['Navbar-item']}>
    <Link to={path}>
      {children}
    </Link>
  </li>
);
