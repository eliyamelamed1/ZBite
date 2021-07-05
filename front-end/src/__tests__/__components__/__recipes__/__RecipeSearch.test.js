import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeSearch from '../../../components/recipes/RecipeSearch';
import { recipeSearchAction } from '../../../redux/actions/recipe';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

jest.mock('../../../redux/actions/recipe', () => ({ recipeSearchAction: jest.fn() }));
beforeEach(() => {
    render(
        <Provider store={store}>
            <RecipeSearch />
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

describe('RecipeSearch', () => {
    test('renders without crashing', () => {});
    test('match RecipeSearch dataTestId', () => {
        expect(screen.getByTestId('RecipeSearch')).toBeInTheDocument();
    });
    test('flavor type options renders', () => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Sour' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Sweet' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Salty' })).toBeInTheDocument();
    });

    test('search button render', () => {
        expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });
    test('submit button should dispatch recipeSearchAction', () => {
        const flavorCombobox = screen.getByRole('combobox');
        const searchButton = screen.getByRole('button', { name: 'Search' });

        userEvent.selectOptions(flavorCombobox, 'Sour');
        userEvent.click(searchButton);
        const timesActionDispatched = recipeSearchAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(recipeSearchAction.mock.calls[0][0].flavor_type).toBe('Sour');
    });
});
