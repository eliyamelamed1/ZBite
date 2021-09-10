import '@testing-library/jest-dom';

import * as RecipeCard from '../../../components/recipes/RecipeCard';

import { cleanup, render, screen } from '@testing-library/react';

import DisplayRecipes from '../../../components/recipes/DisplayRecipes';

const firstRecipeData = {
    id: 'recipeId',
    author: 'author',
    title: 'title',
    flavor_type: 'Sour',
    photo_main: '/#',
};
const secondRecipeData = {
    id: 'recipeId2',
    author: 'author2',
    title: 'title2',
    flavor_type: 'Sweet',
    photo_main: '/#2',
};

const recipesToDisplay = [firstRecipeData, secondRecipeData];
const recipeCardSpy = jest.spyOn(RecipeCard, 'default');

describe('DisplayRecipes', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        render(<DisplayRecipes recipesToDisplay={recipesToDisplay} />);
    });
    test('should render without crashing', () => {});
    test('should have called recipeCard twice', () => {
        expect(recipeCardSpy.mock.calls.length).toBe(2);
    });
    test('should have called recipeCard with the proper recipes data', () => {
        expect(recipeCardSpy.mock.calls[0][0]).toEqual(firstRecipeData);
        expect(recipeCardSpy.mock.calls[1][0]).toEqual(secondRecipeData);
    });

    test('component data-testid should match displayUsers', () => {
        const displayRecipes = screen.getByTestId('displayRecipes');
        expect(displayRecipes).toBeInTheDocument();
    });
});
