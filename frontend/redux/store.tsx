import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '.';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
