import '@testing-library/jest-dom/extend-expect';

import * as RecipeActions from '../../../redux/actions/recipeActions';

import { cleanup, render } from '@testing-library/react';

import { Provider } from 'react-redux';
import ReviewDelete from '../../../components/reviews/ReviewDelete';
import { TEST_CASE_AUTH } from '../../../redux/constants';
import { screen } from '@testing-library/dom';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

const reviewDeleteActionSpy = jest.spyOn(RecipeActions, 'reviewDeleteAction');

describe('ReviewDelete', () => {
    describe('authenticated as the review author ', () => {
        const reviewId = 'reviewId';
        const recipeId = 'recipeId';
        beforeEach(() => {
            jest.clearAllMocks();
            cleanup();
            render(
                <Provider store={store}>
                    <ReviewDelete reviewId={reviewId} recipeId={recipeId} />
                </Provider>
            );
        });
        test('should render without crashing', () => {});
        test('should display "Delete a review" button', () => {
            const deleteButton = screen.getByRole('button', { name: /delete/i });
            expect(deleteButton).toBeInTheDocument();
        });
        test('success in deleting a review should dispatch reviewDeleteAction  ', () => {
            const deleteButton = screen.getByRole('button', { name: /delete/i });
            userEvent.click(deleteButton);

            const timesActionDispatched = reviewDeleteActionSpy.mock.calls.length;

            expect(timesActionDispatched).toBe(1);
            expect(reviewDeleteActionSpy.mock.calls[0][0]).toEqual({ reviewId: reviewId, recipeId: recipeId });
        });
        test('failure in deleting a review should not dispatch reviewDeleteAction  ', () => {
            reviewDeleteActionSpy.mockReturnValueOnce(() => {
                throw new Error();
            });
            const deleteButton = screen.getByRole('button', { name: /delete/i });
            userEvent.click(deleteButton);

            const timesActionDispatched = reviewDeleteActionSpy.mock.calls.length;

            expect(timesActionDispatched).toBe(1);
            expect(reviewDeleteActionSpy.mock.calls[0][0]).toEqual({ reviewId: reviewId, recipeId: recipeId });
        });
    });
});
