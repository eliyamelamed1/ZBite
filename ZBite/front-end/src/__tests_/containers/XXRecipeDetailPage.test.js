import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import RecipeDetailPage from '../../containers/RecipeDetailPage';
import { Provider } from 'react-redux';
import store from '../../store';

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
