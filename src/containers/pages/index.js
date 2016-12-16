import React, {PropTypes, Component} from 'react';
import get from 'lodash';

import Sidebar from '../../components/sidebar';
import Menu from '../../components/menu';
import Main from '../../components/main';

import {getPage, buildPagesTree, getChildrenOfPage} from '../../api';

import styles from './styles.css';


function getChildren() {

}

class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = { menuItems: [] };
  }

  componentDidMount() {
    this.updateMenu();
    this.updatePage();
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.params.pageId;
    const newId = this.props.params.pageId;

    if (newId === oldId) { return; }

    this.updateMenu();
    this.updatePage();
  }

  updateMenu() {
    buildPagesTree().then(rootNode => {
      this.setState({
        menuItems: rootNode.meta.children
      });
    });
  }

  updatePage() {
    const pageId = this.props.params.pageId;
    if (!pageId) {
      return this.setState({pageData: undefined});
    }

    getPage(pageId).then(data => {
      this.setState({
        pageData: data
      });
    });
  }

  renderPage() {
    if (!this.state.pageData) {
      return <h2>Pages</h2>;
    }
    return <iframe className={styles['Pages-preview']} src={this.state.pageData.meta.html_url} frameBorder="0"></iframe>;
  }

  render() {
    return (
      <div className={styles.Pages}>
        <Sidebar>
          <Menu title="Explore pages" items={this.state.menuItems}/>
        </Sidebar>
        <Main>
          {this.renderPage()}
        </Main>
      </div>
    );
  }
}

export default Pages;
