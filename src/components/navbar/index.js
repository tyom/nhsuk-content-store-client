import React from 'react';
import classNames from 'classnames';

import {Link} from 'react-router';
import styles from './styles.css';


export const Navbar = ({ children }) => (
  <nav className={styles.Navbar}>
    <ul className={styles['Navbar-list']}>
      {children}
    </ul>
  </nav>
);

export const NavbarItem = ({ path, children, isActive }) => (
  <li className={classNames(styles['Navbar-item'], {
    [styles['is-selected']]: isActive
  })}>
    <Link to={path}>
      {children}
    </Link>
  </li>
);
