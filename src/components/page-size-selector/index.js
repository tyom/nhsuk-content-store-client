import React, {Component} from 'react';
import classNames from 'classnames';
import FaMobile from 'react-icons/lib/fa/mobile';
import FaTablet from 'react-icons/lib/fa/tablet';
import FaDesktop from 'react-icons/lib/fa/desktop';

import styles from './styles.css';


class PageSizeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: 'large'
    };
  }

  setSize(size) {
    this.setState({
      selectedSize: size
    });
    this.props.onChange(size);
  }

  renderButton(size, icon) {
    const className = classNames({ [styles['is-active']]: this.state.selectedSize === size });

    return (
      <button onClick={() => this.setSize(size)} className={className}>
        {icon}
      </button>
    );
  }

  render() {
    return (
      <menu className={styles['PageSizeSelector']}>
        {this.renderButton('small', <FaMobile/>)}
        {this.renderButton('medium', <FaTablet/>)}
        {this.renderButton('large', <FaDesktop/>)}
      </menu>
    );
  }
}

export default PageSizeSelector;
