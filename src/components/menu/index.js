import React from 'react';
import {Link} from 'react-router';
import isEmpty from 'lodash/isEmpty';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

import styles from './styles.css';


function buildMenu(tree) {
  if (isEmpty(tree) || !Array.isArray(tree.meta.children)) {return null;}

  return (
    <ul className={styles['Menu-list']}>
      {tree.meta.children.map(node =>
        <li className={styles['Menu-item']} key={node.id}>
          <Link to={`/pages/${node.id}`}>
            {renderIcon(node)}
            {node.title}
          </Link>
          {node.isExpanded ? buildMenu(node): null}
        </li>
      )}
    </ul>
  );
}

function renderIcon(node) {
  if (!(node.meta.children && node.meta.children.length) || node.meta.children.count === 0) {return null;}

  return (
    node.isExpanded ? <FaAngleDown/> : <FaAngleRight/>
  );
}

const Menu = ({ title, tree, onSearch }) => {
  return (
    <nav className={styles.Menu}>
      { title ? <h2 className={styles['Menu-title']}>{title}</h2> : null }
      <input type="text" placeholder="Find page" onKeyUp={onSearch} className={styles['Menu-search']}/>
      {buildMenu(tree)}
    </nav>
  );
};

export default Menu;
