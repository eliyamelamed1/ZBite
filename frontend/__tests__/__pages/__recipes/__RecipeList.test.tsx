import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import DisplayRecipes from '../../../components/recipes/DisplayRecipes';
import { Provider } from 'react-redux';
import React from 'react';
import RecipeList from '../../../pages/recipes/RecipeList';
import configureStore from 'redux-mock-store';
import { loadRecipeListAction } from '../../../redux/actions/recipe';
import thunk from 'redux-thunk';

jest.mock('../../../redux/actions/recipe', () => ({ loadRecipeListAction: jest.fn() }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const params = {
    data: {
        title: 'first recipe title',
        flavor_type: 'Sour',
        photo_main: '/recipe image #',
        id: 'first recipe id',
        author: 'first recipe author',
    },

    data2: {
        title: 'second recipe title',
        flavor_type: 'Sweet',
        photo_main: '/recipe image #2',
        id: 'second recipe id',
        author: 'second recipe author',
    },
};
const recipeListData = [params.data, params.data2];
let initialState = {
    recipeReducer: { recipeListData: recipeListData },
};
const store = mockStore(initialState);
describe('RecipeList', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <RecipeList recipeListData={recipeListData} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.resetAllMocks();
    });
    test('renders without crashing', () => {});
    test('should render DisplayRecipes component', () => {
        const DisplayRecipes = screen.getByTestId('displayRecipes');
        expect(DisplayRecipes).toBeInTheDocument();
    });
    test('should dispatch loadRecipeListAction', () => {
        const timesActionDispatched = loadRecipeListAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
    });
    test('should render RecipeList component', () => {
        const RecipeList = screen.getByTestId('recipeList');
        expect(RecipeList).toBeInTheDocument();
    });
});

// jest.mock('../../../components/recipes/DisplayRecipes', () => {
//     return jest.fn(() => null);
// });
// describe('asdasd', () => {
//     beforeEach(() => {
//         render(
//             <Provider store={store}>
//                 <RecipeList />
//             </Provider>
//         );
//     });

//     afterEach(() => {
//         cleanup();
//         jest.resetAllMocks();
//     });

//     test('DisplayUsers.propType.recipesToDisplay should get recipeListData', () => {
//         expect(DisplayRecipes).toHaveBeenCalled();
//         expect(DisplayRecipes).toHaveBeenCalledWith({ recipesToDisplay: recipeListData }, {});
//     });
// });
