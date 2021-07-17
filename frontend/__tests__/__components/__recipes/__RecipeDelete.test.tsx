// TODO - add test to redirect after recipe have been deleted
// TODO - add tests to verify onSubmit function is working properly

import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeDelete from '../../../components/recipes/RecipeDelete';
import Router from 'next/router';
import configureStore from 'redux-mock-store';
import { recipeDeleteAction } from '../../../redux/actions/recipe';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

const recipeId = '1';
jest.mock('../../../redux/actions/recipe', () => ({ recipeDeleteAction: jest.fn().mockReturnValue(() => true) }));
jest.mock('next/router', () => ({ push: jest.fn() }));

describe('RecipeDelete', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <RecipeDelete id={recipeId} />
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
    test('success form submit should call recipeDeleteAction and redirect to home page', () => {
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        userEvent.click(deleteButton);

        const timesActionDispatched = recipeDeleteAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(recipeDeleteAction.mock.calls[0][0].id).toBe(recipeId);
        expect(Router.push.mock.calls.length).toBe(1);
        expect(Router.push.mock.calls[0][0]).toBe('/');
    });
    test('failure form submit should call recipeDeleteAction and not redirect to home page', () => {
        recipeDeleteAction.mockReturnValueOnce(() => {
            throw new Error();
        });
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        userEvent.click(deleteButton);

        const timesActionDispatched = recipeDeleteAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(recipeDeleteAction.mock.calls[0][0].id).toBe(recipeId);
        expect(Router.push.mock.calls.length).toBe(0);
    });
});
