import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeDetails from '../../../components/recipes/RecipeDetails';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

// beforeEach(() => {
//     const renderWithRouter = (ui, { route = '/recipes/2/' } = {}) => {
//         window.history.pushState({}, 'Test page', route);

//         return render(

//             ui, { wrapper: Router }
//             );
//     };
//     renderWithRouter(<RecipeDetails id={'2'} />);
// });

// afterEach(() => {
//     cleanup();
// });

describe('RecipeDetails', () => {
    test('should render without crashing', () => {});
    // test('should render RecipeDetails', () => {
    //     const detailPage = screen.getByRole('link', { name: 'View Recipe Details' });
    //     userEvent.click(detailPage);
    //     const recipeDetails = screen.getByTestId('recipeDetails');
    //     expect(recipeDetails).toBeInTheDocument();
    // });
});

// use this line on RecipeDetails file for more info
// console.log(props.match);
