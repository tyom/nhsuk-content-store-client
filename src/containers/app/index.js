import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

import {Navbar, NavbarItem} from '../../components/navbar';

import styles from './styles.css';


class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <h1>
            <Link to="/">NHS Content Store</Link>
          </h1>
          <Navbar>
            <NavbarItem>Home</NavbarItem>
          </Navbar>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
