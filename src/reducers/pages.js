import {combineReducers} from 'redux';

import {TOGGLE_MENU} from '../actions';

const initialState = {
  isMenuClosed: false
};

function PagesReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        isMenuClosed: !state.isMenuClosed
      };
    default:
      return state;
  }
}

export default PagesReducer;
