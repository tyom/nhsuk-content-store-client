import React from 'react';

import styles from './styles.css';


const PageEditFieldset = ({legend, children}) => (
  <fieldset className={styles['PageEdit-fieldset']}>
    <legend>{legend}</legend>
    {children}
  </fieldset>
);

const PageEdit = ({data}) => (
  <div className={styles['PageEdit']}>
    <PageEditFieldset legend="Header">
      <div className={styles['PageEdit-group']}>
        <label htmlFor="title">Page title</label>
        <input type="text" id="title" value={data.title}/>
      </div>
    </PageEditFieldset>
    <PageEditFieldset legend="Main">
      {data.main && data.main.map(item =>
        <div className={styles['PageEdit-group']}>
          <label htmlFor="">Page content</label>
          <textarea value={item.value}/>
        </div>
      )}
    </PageEditFieldset>
  </div>
);

export default PageEdit;
