import React from 'react';

import PageAddModule from '../../components/page-add-module';

import styles from './styles.css';


const DEFAULT_MODULES = [
  { type: 'markdown', name: 'Markdown' }
];

function onAddition(module) {
  console.log(module);
}

const PageEditFieldset = ({ legend, children, modules=DEFAULT_MODULES }) => (
  <fieldset className={styles['PageEdit-fieldset']}>
    <legend>{legend}</legend>
    {children}
    <PageAddModule modules={modules} onAddition={onAddition}/>
  </fieldset>
);

const PageEdit = ({ data }) => (
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
          {console.log(item)}
          <label htmlFor="">Page content</label>
          <textarea value={item.value}/>
        </div>
      )}
    </PageEditFieldset>
  </div>
);

export default PageEdit;
