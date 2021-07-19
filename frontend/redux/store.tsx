import { applyMiddleware, createStore } from 'redux';

import { HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '.';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const isDefined = (object) => {
    if (object !== null) {
        return true;
    } else {
        return false;
    }
};

const updateState = (previousState, newState) => {
    newState = newState.authReducer;
    previousState = previousState.authReducer;
    const auth_token = previousState.auth_token;
    const isUserAuthenticated = previousState.isUserAuthenticated;
    const loggedUserDetails = previousState.loggedUserDetails;

    if (isDefined(auth_token)) newState.auth_token = auth_token;
    if (isDefined(isUserAuthenticated)) newState.isUserAuthenticated = isUserAuthenticated;
    if (isDefined(loggedUserDetails)) newState.loggedUserDetails = loggedUserDetails;

    return newState;
};

const wrappedReducer = (previousState, action) => {
    if (action.type === HYDRATE) {
        const newState = { ...action.payload };

        updateState(previousState, newState);
        return newState;
    } else {
        return rootReducer(previousState, action);
    }
};

export const store = createStore(wrappedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const makeStore = () => createStore(wrappedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export const wrapperStore = createWrapper(makeStore, { debug: true });
