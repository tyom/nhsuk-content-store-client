import React from 'react';

import styles from './styles.css';


const Main = ({children}) => (
  <main className={styles.Main}>
    {children}
  </main>
);

export default Main;
