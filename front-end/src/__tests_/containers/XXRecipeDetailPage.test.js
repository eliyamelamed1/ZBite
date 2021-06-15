import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeDetailPage from '../../containers/recipes/RecipeDetailPage';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/store';
import userEvent from '@testing-library/user-event';

// beforeEach(() => {
//     const renderWithRouter = (ui, { route = '/recipes/2/' } = {}) => {
//         window.history.pushState({}, 'Test page', route);

//         return render(

//             ui, { wrapper: Router }
//             );
//     };
//     renderWithRouter(<RecipeDetailPage id={'2'} />);
// });

// afterEach(() => {
//     cleanup();
// });

describe('RecipeDetailPage', () => {
    test('should render without crashing', () => {});
    // test('should render RecipeDetailPage', () => {
    //     const detailPage = screen.getByRole('link', { name: 'View Recipe Details' });
    //     userEvent.click(detailPage);
    //     const recipeDetailPage = screen.getByTestId('recipeDetailPage');
    //     expect(recipeDetailPage).toBeInTheDocument();
    // });
});

// use this line on RecipeDetailPage file for more info
// console.log(props.match);
