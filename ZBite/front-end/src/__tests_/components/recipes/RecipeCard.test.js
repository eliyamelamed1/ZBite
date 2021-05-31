import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import React from 'react';
import RecipeCard from '../../../components/recipes/RecipeCard';
import { BrowserRouter as Router } from 'react-router-dom';

beforeEach(() => {
    render(
        <Router>
            <RecipeCard
                title='recipeTitle'
                flavor_type='Sour'
                id='recipeId'
                author='recipeAuthor'
                photo_main='recipeImage'
            />
        </Router>
    );
});

afterEach(() => {
    cleanup();
});

describe('RecipeCard', () => {
    test('renders without crashing', () => {});
    test('RecipeCard renders recipe details', () => {
        expect(screen.getByText(/Title: recipeTitle/)).toBeInTheDocument();
        expect(screen.getByText(/Author: recipeAuthor/)).toBeInTheDocument();
        expect(screen.getByText(/Flavor: Sour/)).toBeInTheDocument();
        const image = screen.getByAltText(/Recipe Image/);
        expect(image.src).toBe('http://localhost/recipeImage');
    });
    test('link to recipe detail contains recipe id', () => {
        const recipeDetailUrl = screen.getByRole('link', { name: /Recipe Details/i });
        expect(recipeDetailUrl.href).toBe('http://localhost/recipes/recipeId/');
    });
});
