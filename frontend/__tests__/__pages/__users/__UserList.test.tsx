import '@testing-library/jest-dom/extend-expect';

import UserList, { getStaticProps } from '../../../pages/users/UserList';
import { cleanup, render, screen } from '@testing-library/react';

import React from 'react';
import { loadUserListAction } from '../../../redux/actions/userActions';

const listOfUsers = [
    {
        email: 'firstUser@gmail.com',
        name: 'firstUserName',
        id: '1',
    },
    {
        email: 'secondUser@gmail.com',
        name: 'secondUserName',
        id: '2',
    },
];
jest.mock('../../../redux/store.tsx', () => ({
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
        userReducer: { listOfUsers: listOfUsers },
    })),
}));
jest.mock('../../../redux/actions/userActions', () => ({ loadUserListAction: jest.fn() }));
describe('UserList', () => {
    beforeEach(async () => {
        const listOfUsers = (await getStaticProps()).props.listOfUsers;
        render(<UserList listOfUsers={listOfUsers} />);
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('render without crashing', () => {});
    test('match userList data-test-id', () => {
        expect(screen.getByTestId('userList')).toBeInTheDocument();
    });
    test('loadUserListAction should be dispatched', () => {
        const timesActionDispatched = loadUserListAction.mock.calls.length;
        expect(timesActionDispatched).toBe(1);
    });
    test('renders displayUsers component', () => {
        expect(screen.getByTestId('displayUsers')).toBeInTheDocument();
    });
    test('getStaticProps - should dispatch loadUserListAction', async () => {
        const timesActionDispatched = loadUserListAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
    });
    test('getStaticProps - should return matching revalidate', async () => {
        const revalidate = (await getStaticProps()).revalidate;
        expect(revalidate).toBe(10);
    });
    test('getStaticProps - should return matching props', async () => {
        const props = (await getStaticProps()).props;
        expect(props.listOfUsers).toEqual(listOfUsers);
    });
});
