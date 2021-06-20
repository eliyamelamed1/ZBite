import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import IsRecipeAuthor from '../../../components/recipes/IsRecipeAuthor';
import { Provider } from 'react-redux';
import React from 'react';
import store from '../../../redux/store';

afterEach(() => {
    cleanup();
});

describe('IsRecipeAuthor - general', () => {
    beforeEach(() => {
        const recipe = {
            title: 'recipeTitle',
            flavor_type: 'Sour',
            id: 'recipeId',
            author: '1',
            photo_main: 'recipeImage',
        };
        render(
            <Provider store={store}>
                <IsRecipeAuthor recipe={recipe} />
            </Provider>
        );
    });
    test('should render without crashing', () => {});
});

describe('IsRecipeAuthor - author', () => {
    beforeEach(() => {
        store.dispatch({ type: 'USER_LOADED_SUCCESS', payload: { id: 1 } });
        const recipe = {
            title: 'recipeTitle',
            flavor_type: 'Sour',
            id: 'recipeId',
            author: '1',
            photo_main: 'recipeImage',
        };
        render(
            <Provider store={store}>
                <IsRecipeAuthor recipe={recipe} />
            </Provider>
        );
    });
    test('should render without crashing', () => {});
    test('should render authorLinks', () => {
        const authorLinks = screen.getByTestId('authorLinks');
        expect(authorLinks).toBeInTheDocument();
    });
});

describe('IsRecipeAuthor - guest', () => {
    beforeEach(() => {
        store.dispatch({ type: 'USER_LOADED_SUCCESS', payload: { id: 2 } });
        const recipe = {
            title: 'recipeTitle',
            flavor_type: 'Sour',
            id: 'recipeId',
            author: '1',
            photo_main: 'recipeImage',
        };
        render(
            <Provider store={store}>
                <IsRecipeAuthor recipe={recipe} />
            </Provider>
        );
    });
    test('should render without crashing', () => {});
    test('should render guestLinks', () => {
        const guestLinks = screen.getByTestId('guestLinks');
        expect(guestLinks).toBeInTheDocument();
    });
});
