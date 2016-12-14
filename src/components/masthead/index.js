import React from 'react';
import {Link} from 'react-router';

import styles from './styles.css';


const Masthead = ({title, children}) => (
  <header className={styles.Masthead}>
    <h1 className={styles['Masthead-title']}>
      <Link to="/">{title}</Link>
    </h1>
    {children}
  </header>
);

export default Masthead;
