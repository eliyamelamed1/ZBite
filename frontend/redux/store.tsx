import { applyMiddleware, createStore } from 'redux';

import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import recipeReducer from './reducers/recipeReducer';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    userReducer,
    recipeReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;
