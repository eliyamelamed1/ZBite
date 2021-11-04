import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import React from 'react';
import RecipeCard from '../../../components/recipes/RecipeCard';

beforeEach(() => {
    cleanup();
    render(
        <RecipeCard
            title='recipeTitle'
            flavor_type='Sour'
            id='recipeId'
            author='recipeAuthor'
            photo_main='/recipeImage'
        />
    );
});

describe('RecipeCard', () => {
    test('renders without crashing', () => {});
    test('RecipeCard renders recipe details', () => {
        expect(screen.getByText(/recipeTitle/)).toBeInTheDocument();
        expect(screen.getByText(/recipeAuthor/)).toBeInTheDocument();
        // expect(screen.getByText(/Flavor: Sour/)).toBeInTheDocument();
        // const image = screen.getByAltText('');
        // TODO - test image.src is equal to the value passed
        // expect(image.src).toBe('http://localhost/recipeImage');
    });
    test('link to recipe detail contains recipe id', () => {
        const recipeDetailUrl = screen.getByRole('link');
        expect(recipeDetailUrl.href).toBe('http://localhost/recipes/recipeId');
    });
});
