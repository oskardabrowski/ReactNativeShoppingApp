import {SET_ITEMS, SET_ITEM_ID} from './actions';

const initialState = {
  items: [],
  itemID: 1,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return {...state, items: action.payload};
    case SET_ITEM_ID:
      return {...state, itemID: action.payload};
    default:
      return state;
  }
}
