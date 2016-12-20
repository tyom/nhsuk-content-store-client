import React from 'react';

import AddModule from '../../components/page/add-module';

import styles from './styles/edit.css';


const DEFAULT_MODULES = [
  { type: 'markdown', name: 'Markdown' }
];

function onAddition(module) {
  console.log(module);
}

const EditFieldset = ({ legend, children, modules=DEFAULT_MODULES }) => (
  <fieldset className={styles['Edit-fieldset']}>
    <legend>{legend}</legend>
    {children}
    <AddModule modules={modules} onAddition={onAddition}/>
  </fieldset>
);

const Edit = ({ data }) => (
  <div className={styles['Edit']}>
    <EditFieldset legend="Header">
      <div className={styles['Edit-group']}>
        <label htmlFor="title">Page title</label>
        <input type="text" id="title" value={data.title}/>
      </div>
    </EditFieldset>
    <EditFieldset legend="Main">
      {data.main && data.main.map((item, i) =>
        <div className={styles['Edit-group']} key={item.type + i}>
          <label htmlFor="">Page content</label>
          <textarea value={item.value}/>
        </div>
      )}
    </EditFieldset>
  </div>
);

export default Edit;
