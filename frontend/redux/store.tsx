import { applyMiddleware, createStore } from 'redux';

import { HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '.';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const isObjectDefined = (object) => {
    if (object !== null && object !== undefined) {
        return true;
    } else {
        return false;
    }
};

// const saveAuthReducerData = (previousState, newState) => {
//     const { auth_token, isUserAuthenticated, loggedUserDetails } = previousState.authReducer;
//     const values = { auth_token, isUserAuthenticated, loggedUserDetails };
//     for (const value in values) {
//         if (isObjectDefined(values[value])) return (newState.authReducer.value = values[value]);
//         else return false;
//     }

//     return newState;
// };

const saveAuthReducerData = (previousState, newState) => {
    const auth_token = previousState.authReducer.auth_token;
    const isUserAuthenticated = previousState.authReducer.isUserAuthenticated;
    const loggedUserDetails = previousState.authReducer.loggedUserDetails;
    const listOfUsers = previousState.authReducer.listOfUsers;
    const searchedUserDetails = previousState.authReducer.searchedUserDetails;

    if (isObjectDefined(auth_token)) newState.authReducer.auth_token = auth_token;
    if (isObjectDefined(isUserAuthenticated)) newState.authReducer.isUserAuthenticated = isUserAuthenticated;
    if (isObjectDefined(loggedUserDetails)) newState.authReducer.loggedUserDetails = loggedUserDetails;
    if (isObjectDefined(listOfUsers)) newState.authReducer.listOfUsers = listOfUsers;
    if (isObjectDefined(searchedUserDetails)) newState.authReducer.searchedUserDetails = searchedUserDetails;

    return newState;
};

const wrapperReducer = (previousState, action) => {
    if (action.type === HYDRATE) {
        const newState = {
            ...previousState,

            // update the previous state
            ...action.payload,
        };

        saveAuthReducerData(previousState, newState);
        return newState;
    } else {
        return rootReducer(previousState, action);
    }
};

export const store = createStore(wrapperReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const makeStore = () => createStore(wrapperReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export const wrapperStore = createWrapper(makeStore, { debug: false });
