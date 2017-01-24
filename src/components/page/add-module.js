import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import GoPlus from 'react-icons/lib/go/plus';
import GoDash from 'react-icons/lib/go/dash';

import styles from './styles/add-module.css';


class AddModule extends Component {
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
        <button onClick={this.handleToggle.bind(this)} aria-label="Add module">
          { this.state.isExpanded ? <GoDash/> : <GoPlus/> }
        </button>
        <menu className={ classNames({ [styles['is-expanded']]: this.state.isExpanded }) }>
          {this.props.modules.map((module, i) =>
            <button onClick={() => this.props.onAddition(module)} key={module.name + i}>
              {module.name}
            </button>
          )}
        </menu>
      </div>
    );
  }
}

AddModule.propTypes = {
  modules: PropTypes.array,
  onAddition: PropTypes.func
};

export default AddModule;
