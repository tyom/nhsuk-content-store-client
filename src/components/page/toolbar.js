import React from 'react';
import classNames from 'classnames';
import {TiEye, TiEdit, TiSpanner} from 'react-icons/lib/ti';

import styles from './styles/toolbar.css';


const TOOLBAR_ITEMS = [{
  icon: TiEye,
  name: 'Preview'
}, {
  icon: TiEdit,
  name: 'Edit'
}, {
  icon: TiSpanner,
  name: 'Attributes'
}];

const ToolbarButton = ({onClick, isSelected, children}) => {
  return (
    <button
      className={classNames({ [styles['is-selected']]: isSelected})}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const PageToolbar = ({ selectedItem, onChange }) => (
  <menu className={styles['PageToolbar']}>
    {TOOLBAR_ITEMS.map(item =>
      <ToolbarButton onClick={onChange} isSelected={selectedItem === item.name} key={item.name}>
        <item.icon/>
        {item.name}
      </ToolbarButton>
    )}
  </menu>
);

export default PageToolbar;
