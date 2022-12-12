import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import itemReducer from './reducers';

const rootReducer = combineReducers({itemReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
