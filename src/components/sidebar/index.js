import React from 'react';

import styles from './styles.css';


const Sidebar = ({children}) => (
  <aside className={styles.Sidebar}>
    {children}
  </aside>
);

export default Sidebar;
