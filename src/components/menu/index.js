import React from 'react';
import {Link} from 'react-router';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

import styles from './styles.css';


function buildMenu(nodes) {
  return (
    <ul className={styles['Menu-list']}>
      {nodes.map(node =>
        <li className={styles['Menu-item']} key={node.id}>
          <Link to={`/pages/${node.id}`}>
            {renderIcon(node)}
            {node.title}
          </Link>
          {Array.isArray(node.meta.children)
            ? buildMenu(node.meta.children)
            : null
          }
        </li>
      )}
    </ul>
  );
}

function renderIcon(node) {
  if (!node.meta.children || node.meta.children.count === 0) {return null;}

  return (
    <FaAngleDown/>
  );
}

const Menu = ({ title, items = [] }) => {
  if (!items.length) {return null;}

  return (
    <nav className={styles.Menu}>
      { title ? <h2 className={styles['Menu-title']}>{title}</h2> : null }
      {buildMenu(items)}
    </nav>
  );
};

export default Menu;
