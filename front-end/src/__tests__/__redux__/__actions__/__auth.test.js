import '@testing-library/jest-dom/extend-expect';

import { loadUserListAction, testAxios } from '../../../redux/actions/auth';

import axios from 'axios';

jest.mock('axios');
describe('axios request should match url endpoint', () => {
    test('testAxios - working test', () => {
        testAxios();
        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toBe('blah');
    });
});
