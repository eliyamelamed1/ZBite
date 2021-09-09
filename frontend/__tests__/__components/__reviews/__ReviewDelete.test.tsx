import '@testing-library/jest-dom/extend-expect';

import * as ReviewActions from '../../../redux/actions/reviewsActions';

import { Provider } from 'react-redux';
import ReviewDelete from '../../../components/reviews/ReviewDelete';
import { cleanup } from 'next-page-tester';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

const reviewDeleteActionSpy = jest.spyOn(ReviewActions, 'reviewDeleteAction');

describe('ReviewDelete', () => {
    describe('authenticated as the review author ', () => {
        const reviewId = 'reviewId';
        beforeEach(() => {
            jest.clearAllMocks();
            cleanup();
            render(
                <Provider store={store}>
                    <ReviewDelete id={reviewId} />
                </Provider>
            );
        });
        test('should render without crashing', () => {});
        test('should match own data-testid', () => {
            expect(screen.getByTestId('reviewDelete')).toBeInTheDocument();
        });
        test('should display "Delete a review" button', () => {
            const deleteButton = screen.getByRole('button', { name: /delete/i });
            expect(deleteButton).toBeInTheDocument();
        });
        test('success in deleting a review should dispatch reviewDeleteAction  ', () => {
            const deleteButton = screen.getByRole('button', { name: /delete/i });
            userEvent.click(deleteButton);

            const timesActionDispatched = reviewDeleteActionSpy.mock.calls.length;

            expect(timesActionDispatched).toBe(1);
            expect(reviewDeleteActionSpy.mock.calls[0][0].id).toBe(reviewId);
        });
        test('failure in deleting a review should not dispatch reviewDeleteAction  ', () => {
            reviewDeleteActionSpy.mockReturnValueOnce(() => {
                throw new Error();
            });
            const deleteButton = screen.getByRole('button', { name: /delete/i });
            userEvent.click(deleteButton);

            const timesActionDispatched = reviewDeleteActionSpy.mock.calls.length;

            expect(timesActionDispatched).toBe(1);
            expect(reviewDeleteActionSpy.mock.calls[0][0].id).toBe(reviewId);
        });
    });
});
