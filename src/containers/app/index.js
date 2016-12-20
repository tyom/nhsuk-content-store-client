import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

import {Navbar, NavbarItem} from '../../components/navbar';

import styles from './styles.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSection: ''
    };
  }

  componentDidMount() {
    this.setCurrentSection();
  }

  componentDidUpdate(prevProps) {
    const oldPath = prevProps.location.pathname;
    const newPath = this.props.location.pathname;

    if (oldPath === newPath) { return; }

    this.setCurrentSection();
  }

  setCurrentSection() {
    this.setState({
      currentSection: this.props.location.pathname.replace(/\/(\w+)\/?.*/, '$1')
    });
  }

  render() {
    return (
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <h1>
            <Link to="/">NHS Content Store</Link>
          </h1>
          <Navbar>
            <NavbarItem path="/pages" isActive={this.state.currentSection === 'pages'}>Pages</NavbarItem>
            <NavbarItem path="/images" isActive={this.state.currentSection === 'images'}>Images</NavbarItem>
          </Navbar>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
