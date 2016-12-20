import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import Sidebar from '../../components/sidebar';
import Menu from '../../components/menu';
import Main from '../../components/main';
import PageSizeSelector from '../../components/page-size-selector';
import PageToolbar from '../../components/page-toolbar';
import PageEdit from '../../components/page-edit';

import {getPage, buildPagesTree, filterTree} from '../../api';

import styles from './styles.css';


let initialTree;

class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuTree: {},
      previewSize: 'large',
      selectedToolbarItem: 'Edit'
    };
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
      return this.setState({ pageData: undefined });
    }

    getPage(pageId).then(data => {
      this.setState({
        pageData: data
      });
    });
  }

  renderPreview() {
    const iframeClassName = classNames(styles['Pages-preview'], {
      [styles['Pages-preview--large']]: this.state.previewSize === 'large',
      [styles['Pages-preview--medium']]: this.state.previewSize === 'medium',
      [styles['Pages-preview--small']]: this.state.previewSize === 'small'
    });

    return (
      <iframe
        className={iframeClassName}
        src={this.state.pageData.meta.html_url}
        frameBorder="0"
      ></iframe>
    );
  }

  renderPage() {
    if (!this.state.pageData) {
      return <h2>Pages</h2>;
    }


    switch(this.state.selectedToolbarItem) {
      case 'Edit':
        return <PageEdit data={this.state.pageData}/>
      case 'Preview':
      case 'default':
        return this.renderPreview();
    }
  }

  setPreviewSize(size) {
    this.setState({
      previewSize: size
    });
  }

  filterTree(evt) {
    this.setState({
      menuTree: filterTree(initialTree, evt.target.value)
    });
  }

  handleToolbarToggle(evt) {
    this.setState({
      selectedToolbarItem: evt.target.textContent
    });
  }

  render() {
    return (
      <div className={styles.Pages}>
        <Sidebar>
          <Menu
            title="Explore pages"
            tree={this.state.menuTree}
            onSearch={evt => this.filterTree(evt)}
            selectedId={+this.props.params.pageId}
          />
        </Sidebar>
        <Main>
          <header className={styles['Main-header']}>
            <PageToolbar selectedItem={this.state.selectedToolbarItem} onChange={this.handleToolbarToggle.bind(this)}/>
            {this.state.selectedToolbarItem === 'Preview'
              ? <PageSizeSelector selectedSize={this.state.previewSize} onChange={size => this.setPreviewSize(size)}/>
              : null
            }
          </header>
          {this.renderPage()}
        </Main>
      </div>
    );
  }
}

export default Pages;
