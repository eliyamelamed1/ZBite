// TODO - add test to redirect after recipe have been deleted
// TODO - add tests to verify onSubmit function is working properly

import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeDelete from '../../../components/recipes/RecipeDelete';
import store from '../../../store';
import userEvent from '@testing-library/user-event';

describe('RecipeDelete - general ', () => {
    test('should render without crashing', () => {
        const id = '1';
        render(
            <Provider store={store}>
                <RecipeDelete id={id} />
            </Provider>
        );
    });
});

describe('RecipeDelete - delete button', () => {
    beforeEach(() => {
        const id = '1';
        render(
            <Provider store={store}>
                <RecipeDelete id={id} />
            </Provider>
        );
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should display delete button', () => {
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();
    });
    test('should delete button should call onSubmit function', () => {
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        userEvent.click(deleteButton);
        const onSubmitHaveBeenCalled = screen.getByTestId('onSubmitHaveBeenCalled');
        expect(onSubmitHaveBeenCalled).toBeInTheDocument();
    });
});
