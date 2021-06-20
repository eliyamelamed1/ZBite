import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeSearch from '../../../components/recipes/RecipeSearch';
import { act } from 'react-dom/test-utils';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

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

    test('submit button should call onSubmit function', async () => {
        act(() => {
            userEvent.selectOptions(screen.getByRole('combobox'), 'Sweet');
            userEvent.click(screen.getByText('Search'));
        });
        const onSubmitHaveBeenCalled = await screen.findByTestId('onSubmitHaveBeenCalled');
        expect(onSubmitHaveBeenCalled).toBeInTheDocument();
    });
});

// test('submit button should dispatch recipeSearchAction, () => {});
