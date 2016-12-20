import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import GoPlus from 'react-icons/lib/go/plus';

import styles from './styles.css';


class PageAddModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  handleToggle() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    return (
      <div className={styles['PageAddModule']}>
        <menu className={ classNames({ [styles['is-expanded']]: this.state.isExpanded }) }>
          {this.props.modules.map(module =>
            <button onClick={() => this.props.onAddition(module)}>{module.name}</button>
          )}
        </menu>
        <button onClick={this.handleToggle.bind(this)}>
          <GoPlus/> Add module
        </button>
      </div>
    );
  }
}

PageAddModule.propTypes = {
  modules: PropTypes.array,
  onAddition: PropTypes.func
};

export default PageAddModule;
