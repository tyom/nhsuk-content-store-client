import React, {Component} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import isEmpty from 'lodash/isEmpty';
import GoChevronRight from 'react-icons/lib/go/chevron-right';
import GoChevronDown from 'react-icons/lib/go/chevron-down';

import styles from './styles.css';


class Menu extends Component {
  constructor(props) {
    super(props);
  }

  handleToggle(evt, node) {
    evt.preventDefault();
    node.isExpanded = !node.isExpanded;
    this.forceUpdate();
  }

  renderMenu(tree) {
    if (isEmpty(tree) || !Array.isArray(tree.meta.children)) {return null;}

    const augmentedMenu = tree.meta.children;

    return (
      <ul className={styles['Menu-list']}>
        {augmentedMenu.map(node =>
          <li key={node.id} className={classNames(styles['Menu-item'], {
            [styles['is-selected']]: node.id === this.props.selectedId
          })}>
            {this.renderIcon(node)}
            <Link to={`/pages/${node.id}`}>
              {node.title}
            </Link>
            {node.isExpanded ? this.renderMenu(node): null}
          </li>
        )}
      </ul>
    );
  }

  renderIcon(node) {
    if (!(node.meta.children && node.meta.children.length) || node.meta.children.count === 0) {
      return null;
    }

    return (
      <button className={styles['Menu-toggle']} onClick={evt => this.handleToggle(evt, node)}>
        {node.isExpanded ? <GoChevronDown/> : <GoChevronRight/>}
      </button>
    );
  }

  render() {
    return (
      <nav className={styles.Menu}>
        { this.props.title ? <h2 className={styles['Menu-title']}>{this.props.title}</h2> : null }
        <input
          type="search"
          placeholder="Find page"
          onChange={this.props.onSearch}
          className={styles['Menu-search']}
        />
        {this.renderMenu(this.props.tree)}
      </nav>
    );
  }
}

export default Menu;
