import { applyMiddleware, createStore } from 'redux';

import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from './reducers/loadingReducer';
import recipeReducer from './reducers/recipeReducer';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    loadingReducer,
    userReducer,
    recipeReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

export type RootState = ReturnType<typeof rootReducer>;
