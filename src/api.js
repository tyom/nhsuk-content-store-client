import fetch from 'isomorphic-fetch';
import {WAGTAIL_API_BASE_URL} from './constants';

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
