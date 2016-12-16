import fetch from 'isomorphic-fetch';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import {WAGTAIL_API_BASE_URL} from './constants';


function unFlatten(collection = [], parent, tree) {
  const children = collection.filter(child => get(child, 'meta.parent.id') === parent.id);

  if (children.length) {
    parent.meta.children = children;

    if (parent.id === 3) {
      tree = parent;
    }

    children.forEach(child => unFlatten(collection, child));
  }

  return tree;
}

function setActiveNodes(tree, id) {
  if (!id) {return null;}

  if (tree.id === +id) {
    tree.isExpanded = true;
    return tree;
  }
  if (!tree.meta.children || tree.meta.children.count === 0) {return null;}

  for (let i=0; i < tree.meta.children.length; i++) {
    const child = tree.meta.children[i];
    const found = setActiveNodes(child, id);
    if (found) {
      child.isExpanded = true;
      return found;
    }
  }

  return null;
}

export function filterTree(tree, term) {
  // if (!tree.meta.children || tree.meta.children.count === 0) {return null;}
  const modifiedTree = cloneDeep(tree);
  const children = [];

  for (let i=0; i < modifiedTree.meta.children.length; i++) {
    const child = modifiedTree.meta.children[i];
    const found = filterTree(child, term);
    if (found) {
      children.push(found);
    }
  }
  modifiedTree.meta.children = children;

  if (modifiedTree.meta.children.length || modifiedTree.title && modifiedTree.title.search(new RegExp(term, 'ig')) > -1) {
    modifiedTree.isExpanded = true;
    return modifiedTree;
  }
  return null;
}

function fetchData(url) {
  return fetch(url, { credentials: 'include' })
    .then(response => response.json());
}

function fetchFromWagtail(path) {
  return fetchData(WAGTAIL_API_BASE_URL + path);
}

export function getPage(pageId) {
  return fetchFromWagtail(`/pages/${pageId}/`);
}

export function buildPagesTree(expandedId=3) {
  return fetchFromWagtail('/pages/?fields=parent')
    .then(body => unFlatten(body.items, find(body.items, {id: 3})))
    .then(tree => {
      setActiveNodes(tree, expandedId);
      return tree;
    });
}

export function getChildrenOfPage(pageId) {
  return fetchFromWagtail(`/pages/?child_of=${pageId}&fields=parent,children`);
}
