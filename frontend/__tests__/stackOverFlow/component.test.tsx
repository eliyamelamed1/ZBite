// TODO - add test to reload page after recipe have been updated
// TODO - add tests to verify onSubmit function is working properly

import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen, waitFor } from '@testing-library/react';

import Component from '../../stackOverFlow/component';
import { Provider } from 'react-redux';
import React from 'react';
import store from '../../redux/store';
import { testAction } from '../../redux/actions/user';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    render(
        <Provider store={store}>
            <Component />
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

describe('RecipeUpdate - general ', () => {
    test('data-testid match recipeUpdate', () => {
        const button = screen.getByRole('button', { name: 'disable' });
        expect(button).toBeInTheDocument();
    });
    test('data-testid match recipeUpdate', async () => {
        const button = screen.getByRole('button', { name: 'disable' });
        userEvent.click(button);

        const newButton = await screen.findByRole('button', { name: 'enable' });
    });
});
