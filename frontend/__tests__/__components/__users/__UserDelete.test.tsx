// TODO - add test to redirect after recipe have been deleted
// TODO - add tests to verify onSubmit function is working properly

import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserDelete from '../../../components/users/UserDelete';
import configureStore from 'redux-mock-store';
import { pageRoute } from '../../../enums';
import thunk from 'redux-thunk';
import { userDeleteAction } from '../../../redux/actions/userActions';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

const userId = 'testId';
jest.mock('../../../redux/actions/userActions', () => ({
    userDeleteAction: jest.fn().mockReturnValue(() => true),
}));

describe('UserDelete', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserDelete id={userId} />
            </Provider>
        );
    });
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should render without crashing', () => {});
    test('should display delete button', () => {
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();
    });
    test('should delete button should dispatch userDeleteAction', () => {
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        userEvent.click(deleteButton);

        const timesActionDispatched = userDeleteAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(userDeleteAction.mock.calls[0][0].id).toBe(userId);
    });
});
