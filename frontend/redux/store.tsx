import { applyMiddleware, createStore } from 'redux';

import authReducer from './reducers/auth';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import recipeReducer from './reducers/recipe';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    authReducer,
    recipeReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;
