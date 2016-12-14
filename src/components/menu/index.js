import React from 'react';
import {Link} from 'react-router';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

import styles from './styles.css';

const menuData = [
  {
    id: 2,
    title: 'symptoms',
    children: [
      {
        id: 5,
        title: 'Headache',
        children: [
          {
            id: 12,
            title: 'Something else',
          }
        ]
      }
    ]
  }, {
    id: 3,
    title: 'foobar'
  }
];

function buildMenu(nodes) {
  return (
    <ul className={styles['Menu-list']}>
      {nodes.map(node =>
        <li className={styles['Menu-item']} key={node.id}>
          <Link to={`/pages/${node.id}`}>
            {renderIcon(node)}
            {node.title}
          </Link>
          {Array.isArray(node.children)
            ? buildMenu(node.children)
            : null
          }
        </li>
      )}
    </ul>
  );
}

function renderIcon(node) {
  if (!node.children) {return null;}

  return (
    <FaAngleRight/>
  );
}

const Menu = ({ title, items = [] }) => {
  if (!items.length) {return null;}

  return buildMenu(items);

  // getChildren(items);

  // const menu = items.map(item => {
  //   return getChildren(item);
  // });
  //
  // console.log('menu', menu);

  return (
    <nav className={styles.Menu}>
      { title ? <h2 className={styles['Menu-title']}>{title}</h2> : null }
      <ul className={styles['Menu-list']}>
        {menuData.map(item =>
          <li className={styles['Menu-item']} key={item.id}>
            <Link to={`/pages/${item.id}`}>
              {item.meta.children.count ? <FaAngleRight/> : null }
              {item.title}
              </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
