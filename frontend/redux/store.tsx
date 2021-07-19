import { applyMiddleware, createStore } from 'redux';

import { HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '.';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const isDefined = (object) => {
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
//         if (isDefined(values[value])) return (newState.authReducer.value = values[value]);
//         else return false;
//     }

//     return newState;
// };

const saveAuthReducerData = (previousState, newState) => {
    previousState = previousState.authReducer;
    newState = newState.authReducer;

    Object.entries(previousState).map(([key, value]) => {
        isDefined(value) ? (newState[key] = value) : null;
    });
    // const auth_token = previousState.auth_token;
    // const isUserAuthenticated = previousState.isUserAuthenticated;
    // const loggedUserDetails = previousState.loggedUserDetails;
    // const listOfUsers = previousState.listOfUsers;
    // const searchedUserDetails = previousState.searchedUserDetails;

    // if (isDefined(auth_token)) newState.auth_token = auth_token;
    // if (isDefined(isUserAuthenticated)) newState.isUserAuthenticated = isUserAuthenticated;
    // if (isDefined(loggedUserDetails)) newState.loggedUserDetails = loggedUserDetails;
    // if (isDefined(listOfUsers)) newState.listOfUsers = listOfUsers;
    // if (isDefined(searchedUserDetails)) newState.searchedUserDetails = searchedUserDetails;

    return newState;
};

// const saveAuthReducerData = (previousState, newState) => {
//     previousState = previousState.authReducer;
//     newState = newState.authReducer;

//     const auth_token = previousState.auth_token;
//     const isUserAuthenticated = previousState.isUserAuthenticated;
//     const loggedUserDetails = previousState.loggedUserDetails;
//     const listOfUsers = previousState.listOfUsers;
//     const searchedUserDetails = previousState.searchedUserDetails;

//     if (isDefined(auth_token)) newState.auth_token = auth_token;
//     if (isDefined(isUserAuthenticated)) newState.isUserAuthenticated = isUserAuthenticated;
//     if (isDefined(loggedUserDetails)) newState.loggedUserDetails = loggedUserDetails;
//     if (isDefined(listOfUsers)) newState.listOfUsers = listOfUsers;
//     if (isDefined(searchedUserDetails)) newState.searchedUserDetails = searchedUserDetails;

//     return newState;
// };

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

export const wrapperStore = createWrapper(makeStore, { debug: true });
