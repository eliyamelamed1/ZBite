// TODO - test DisplayUsers with empty listOfUsers

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import DisplayUsers from '../../../components/users/DisplayUsers';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initialState = {};
const store = mockStore(initialState);

const data = {
    email: 'user email',
    photo_main: '/#',
    id: 'userId',
    name: 'user name',
};
const data2 = {
    email: 'user email2',
    photo_main: '/#',
    id: 'userId2',
    name: 'user name2',
};
const usersToDisplay = [data, data2];
beforeEach(() => {
    render(
        <Provider store={store}>
            <DisplayUsers usersToDisplay={usersToDisplay} />
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

describe('DisplayUsers', () => {
    test('should render without crashing', () => {});
    test('should display multiple users components', () => {
        const userCard = screen.queryAllByTestId('userCard');
        expect(userCard.length).toBe(usersToDisplay.length);
    });
    test('component data-testid should match displayUsers', () => {
        const displayUsers = screen.getByTestId('displayUsers');
        expect(displayUsers).toBeInTheDocument();
    });
});
