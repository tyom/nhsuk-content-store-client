import React, {Component} from 'react';
import {uniqueId} from 'lodash';

import AddModule from '../../components/page/add-module';

import styles from './styles/edit.css';


const DEFAULT_MODULES = [
  { type: 'markdown', name: 'Text' },
  { type: 'callout', name: 'Callout' }
];

function onAddition(module) {
  console.log(module);
}

function onInputChange(evt) {
  // this.setState({ value: evt.target.value });
}

function onTitleChange(evt) {
  console.log(evt);
}

const EditFieldset = ({ legend, children, modules = DEFAULT_MODULES }) => (
  <fieldset className={styles['Edit-fieldset']}>
    <legend>{legend}</legend>
    {children}
    <AddModule modules={modules} onAddition={onAddition}/>
  </fieldset>
);

const EditGroup = ({ item, id }) => {
  return (
    <div className={styles['Edit-group']}>
      <label htmlFor={id}>{item.type}</label>
      <textarea value={item.value} id={id} onChange={onInputChange}/>
    </div>
  );
};

const Edit = ({ data }) => (
  <div className={styles['Edit']}>
    <div className={styles['Edit-group']}>
      <label htmlFor="title">Page title</label>
      <input type="text" id="title" value={data.title} onChange={onTitleChange}/>
    </div>
    <EditFieldset legend="Header">
      {data.header && data.header.map(item => {
        const id = uniqueId(item.type + '-');
        return (
          <EditGroup item={item} key={id} id={id}/>
        )
      })}
    </EditFieldset>
    <EditFieldset legend="Main">
      {data.main && data.main.map(item => {
        const id = uniqueId(item.type + '-');
        return (
          <EditGroup item={item} key={id} id={id}/>
        )
      })}
    </EditFieldset>
  </div>
);

export default Edit;
