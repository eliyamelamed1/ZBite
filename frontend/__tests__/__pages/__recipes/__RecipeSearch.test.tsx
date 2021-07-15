import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeSearch from '../../../pages/recipes/RecipeSearch';
import configureStore from 'redux-mock-store';
import { recipeSearchAction } from '../../../redux/actions/recipe';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

jest.mock('../../../redux/actions/recipe', () => ({ recipeSearchAction: jest.fn() }));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const data = {
    title: 'recipe title',
    flavor_type: 'Sour',
    photo_main: '/recipe image #',
    id: 'recipeId',
    author: 'recipe author',
};
const data2 = {
    title: 'recipe title2',
    flavor_type: 'Sour',
    photo_main: '/recipe image #2',
    id: 'recipeId2',
    author: 'recipe author2',
};
let initialState = {
    recipeReducer: { recipeSearchedListData: [data, data2] },
};
const store = mockStore(initialState);

beforeEach(() => {
    render(
        <Provider store={store}>
            <RecipeSearch />
        </Provider>
    );
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('RecipeSearch', () => {
    test('renders without crashing', () => {});
    test('match RecipeSearch dataTestId', () => {
        expect(screen.getByTestId('recipeSearch')).toBeInTheDocument();
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
    test('should render display recipes component', () => {
        expect(screen.getByTestId('displayRecipes')).toBeInTheDocument();
    });
});
