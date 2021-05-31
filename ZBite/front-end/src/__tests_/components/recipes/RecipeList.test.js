// TODO - test request url
// TODO - test sent get request

import '@testing-library/jest-dom/extend-expect';

import { cleanup, render } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeList from '../../../components/recipes/RecipeList';
import { act } from 'react-dom/test-utils';
import store from '../../../store';

beforeEach(() => {
    act(() => {
        render(
            <Provider store={store}>
                <RecipeList />
            </Provider>
        );
    });
});

afterEach(() => {
    cleanup();
});

describe('RecipeList', () => {
    test('should render without crashing', () => {});
    // test('should dispatch loadRecipeListAction', () => {});
});
