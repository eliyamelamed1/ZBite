import '@testing-library/jest-dom/extend-expect';

import * as DisplayRecipes from '../../../components/recipes/DisplayRecipes';

import RecipeList, { getStaticProps } from '../../../pages/recipes/RecipeList';
import { cleanup, render, screen } from '@testing-library/react';

import React from 'react';
import { loadRecipeListAction } from '../../../redux/actions/recipeActions';
import store from '../../../redux/store';

jest.mock('../../../redux/actions/recipeActions', () => ({
    loadRecipeListAction: jest.fn().mockReturnValue(() => true),
}));
const displayRecipesSpy = jest.spyOn(DisplayRecipes, 'default');
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

jest.mock('../../../redux/store.tsx');
store.getState = () => ({
    recipeReducer: { listOfRecipes: listOfRecipes },
});
describe('RecipeList', () => {
    beforeEach(async () => {
        const listOfRecipes = (await getStaticProps()).props.listOfRecipes;

        render(<RecipeList listOfRecipes={listOfRecipes} />);
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
    test('DisplayUsers.propType.recipesToDisplay should get  listOfRecipes', () => {
        expect(displayRecipesSpy).toHaveBeenCalled();
        expect(displayRecipesSpy).toHaveBeenCalledWith({ recipesToDisplay: listOfRecipes }, {});
    });
});
