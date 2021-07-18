import { applyMiddleware, createStore } from 'redux';

import { HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '.';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const saveAuthReducerData = (state, nextState) => {
    if (state.authReducer.auth_token) nextState.authReducer.auth_token = state.authReducer.auth_token;
    if (state.authReducer.isUserAuthenticated)
        nextState.authReducer.isUserAuthenticated = state.authReducer.isUserAuthenticated;
    if (state.authReducer.loggedUserDetails)
        nextState.authReducer.loggedUserDetails = state.authReducer.loggedUserDetails;

    return nextState;
};

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        console.log(state);
        const nextState = {
            ...state,
            ...action.payload,
        };
        saveAuthReducerData(state, nextState);
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const makeStore = () => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore, { debug: true });
