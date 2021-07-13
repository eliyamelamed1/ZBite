import '@testing-library/jest-dom/extend-expect';

import { loadUserListAction, testAxios } from '../../../redux/actions/auth';

import axios from 'axios';
import store from '../../../redux/store';

jest.mock('axios');
describe('axios request should match url endpoint', () => {
    test('testAxios - working test', () => {
        store.dispatch(testAxios());
        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toBe('blah');
    });
    test('loadUserListAction', async () => {
        store.dispatch(loadUserListAction());
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/accounts/list/`;
        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toBe(endpointUrl);
    });
});
