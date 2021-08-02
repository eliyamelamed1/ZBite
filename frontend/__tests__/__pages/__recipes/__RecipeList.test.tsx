import '@testing-library/jest-dom/extend-expect';

import RecipeList, { getStaticProps } from '../../../pages/recipes/RecipeList';
import { cleanup, render, screen } from '@testing-library/react';

import DisplayRecipes from '../../../components/recipes/DisplayRecipes';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { loadRecipeListAction } from '../../../redux/actions/recipeActions';
import thunk from 'redux-thunk';

jest.mock('../../../redux/actions/recipeActions', () => ({
    loadRecipeListAction: jest.fn().mockReturnValue(() => true),
}));
const listOfRecipes = [
    {
        title: 'first recipe title',
        flavor_type: 'Sour',
        photo_main: '/recipe image #',
        id: 'first recipe id',
        author: 'first recipe author',
    },
    {
        title: 'second recipe title',
        flavor_type: 'Sweet',
        photo_main: '/recipe image #2',
        id: 'second recipe id',
        author: 'second recipe author',
    },
];
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
jest.mock('../../../redux/store.tsx', () => ({
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
        recipeReducer: { listOfRecipes: listOfRecipes },
    })),
}));

describe('RecipeList', () => {
    beforeEach(async () => {
        const listOfRecipes = (await getStaticProps()).props.listOfRecipes;

        render(
            <Provider store={store}>
                <RecipeList listOfRecipes={listOfRecipes} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('renders without crashing', () => {});
    test('should render DisplayRecipes component', () => {
        const DisplayRecipes = screen.getByTestId('displayRecipes');
        expect(DisplayRecipes).toBeInTheDocument();
    });
    test('should render RecipeList component', () => {
        const RecipeList = screen.getByTestId('recipeList');
        expect(RecipeList).toBeInTheDocument();
    });
    test('getStaticProps - should dispatch loadRecipeListAction', async () => {
        const timesActionDispatched = loadRecipeListAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
    });
    test('getStaticProps - should return matching revalidate', async () => {
        const revalidate = (await getStaticProps()).revalidate;
        expect(revalidate).toBe(10);
    });
    test('getStaticProps - should return matching props', async () => {
        const props = (await getStaticProps()).props;
        expect(props.listOfRecipes).toEqual(listOfRecipes);
    });
});

// jest.mock('../../../components/recipes/DisplayRecipes', () => {
//     return jest.fn(() => true);
// });
// describe('asdasd', () => {
//     beforeEach(() => {
//         render(
//             <Provider store={store}>
//                 <RecipeList listOfRecipes={params} />
//             </Provider>
//         );
//     });

//     afterEach(() => {
//         cleanup();
//         // jest.resetAllMocks();
//     });

//     test('DisplayUsers.propType.recipesToDisplay should get  listOfRecipes', () => {
//         expect(DisplayRecipes).toHaveBeenCalled();
//         expect(DisplayRecipes).toHaveBeenCalledWith({ recipesToDisplay: params }, {});
//     });
// });
