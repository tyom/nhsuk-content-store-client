import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';


const TOOLBAR_ITEMS = ['Preview', 'Edit', 'Attributes'];

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
      <ToolbarButton onClick={onChange} isSelected={selectedItem === item} key={item}>
        {item}
      </ToolbarButton>
    )}
  </menu>
);

export default PageToolbar;
