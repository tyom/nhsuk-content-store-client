import React, {PropTypes, Component} from 'react';

import Masthead from '../../components/masthead';
import {Navbar, NavbarItem} from '../../components/navbar';

import styles from './styles.css';


class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Masthead title="NHS Content Store">
          <Navbar>
            <NavbarItem>Home</NavbarItem>
          </Navbar>
        </Masthead>
        {this.props.children}
      </div>
    );
  }
}

export default App;
