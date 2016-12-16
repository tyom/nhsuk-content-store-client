import fetch from 'isomorphic-fetch';
import find from 'lodash/find';
import get from 'lodash/get';
import {WAGTAIL_API_BASE_URL} from './constants';


function unFlatten(collection = [], parent, tree = []) {
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

export function buildPagesTree() {
  return fetchFromWagtail('/pages/?fields=parent')
    .then(body => unFlatten(body.items, find(body.items, {id: 3})));
}

export function getChildrenOfPage(pageId) {
  return fetchFromWagtail(`/pages/?child_of=${pageId}&fields=parent,children`);

  // if (pageId === 1) {
  //   pageData = pageData.then(data => {
  //     const requests = data.items.map(item => fetchData(item.meta.children.listing_url));
  //     return Promise.all(requests);
  //   })
  // }

  // return pageData;
}
