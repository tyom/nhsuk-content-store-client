import React, {PropTypes, Component} from 'react';
import get from 'lodash';

import Sidebar from '../../components/sidebar';
import Menu from '../../components/menu';
import Main from '../../components/main';

import {getPage, getChildrenOfPage} from '../../api';

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
    const pageId = this.props.params.pageId || 3;
    // const isIndexPage = pageId === 1;

    // const currentMenuItems = this.state.menuItems;

    getChildrenOfPage(pageId).then(data => {
      // data = pageId === 1 ? data[0] : data;

      this.setState({
        menuItems: data.items
      });
    });
  }

  updatePage() {
    const pageId = this.props.params.pageId;
    if (!pageId) {
      return this.setState({pageData: undefined});
    }


    getPage(pageId).then(data => {
      console.log(data);
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
