import React, {PropTypes, Component} from 'react';
import get from 'lodash';

import Sidebar from '../../components/sidebar';
import Menu from '../../components/menu';
import Main from '../../components/main';

import {getPage, buildPagesTree, filterTree} from '../../api';

import styles from './styles.css';


let initialTree;

class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = { menuTree: {} };
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
    buildPagesTree(this.props.params.pageId).then(tree => {
      initialTree = tree;
      this.setState({
        menuTree: tree
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

  doTreeFilter(evt) {
    this.setState({
      menuTree: filterTree(initialTree, evt.target.value)
    });
  }

  render() {
    return (
      <div className={styles.Pages}>
        <Sidebar>
          <Menu title="Explore pages" tree={this.state.menuTree} onSearch={(evt) => this.doTreeFilter(evt)}/>
        </Sidebar>
        <Main>
          {this.renderPage()}
        </Main>
      </div>
    );
  }
}

export default Pages;
