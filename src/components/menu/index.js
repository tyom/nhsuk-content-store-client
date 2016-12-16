import React from 'react';
import {Link} from 'react-router';
import isEmpty from 'lodash/isEmpty';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

import styles from './styles.css';


function clickNode(evt) {
  console.log(evt);
}

function buildMenu(tree) {
  if (isEmpty(tree) || !Array.isArray(tree.meta.children)) {return null;}

  return (
    <ul className={styles['Menu-list']}>
      {tree.meta.children.map(node =>
        <li className={styles['Menu-item']} key={node.id} onClick={() => clickNode(node)}>
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
  if (!node.meta.children || node.meta.children.count === 0) {return null;}

  return (
    node.isExpanded ? <FaAngleDown/> : <FaAngleRight/>
  );
}

function doFilter(evt) {
  console.log(evt.target.value);
}

const Menu = ({ title, tree }) => {
  if (isEmpty(tree)) {return null;}

  return (
    <nav className={styles.Menu}>
      { title ? <h2 className={styles['Menu-title']}>{title}</h2> : null }
      <input type="text" onKeyPress={doFilter}/>
      {buildMenu(tree)}
    </nav>
  );
};

export default Menu;
