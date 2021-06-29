import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '.';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
// store.subscribe(() => {
//     const action = store.getState().dispatchedActions;
//     localStorage.setItem(action.type, action.payload);
//     console.log(action);
// });
export default store;
