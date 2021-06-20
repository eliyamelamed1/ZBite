import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import { loadLoggedUserDetailsAction } from '../../../redux/actions/auth';
import store from '../../../redux/store';
import { useDispatch } from 'react-redux';

describe('loadLoggedUserDetailsAction', () => {
    test('fail test case = USER_LOADED_FAIL', () => {
        store.subscribe(() => {
            const action = store.getState().dispatchedActions;
            localStorage.setItem(action.type, action.payload);
        });
        store.dispatch(loadLoggedUserDetailsAction());
        expect(localStorage.USER_LOADED_FAIL).toBeTruthy();
    });
    test('success test case = USER_LOADED_SUCCESS', () => {});
});
