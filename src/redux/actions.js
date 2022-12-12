export const SET_ITEMS = 'SET_ITEMS';
export const SET_ITEM_ID = 'SET_ITEM_ID';

export const setItems = items => dispatch => {
  dispatch({
    type: SET_ITEMS,
    payload: items,
  });
};

export const setItemID = itemID => dispatch => {
  dispatch({
    type: SET_ITEM_ID,
    payload: itemID,
  });
};
