import * as ReviewCard from '../../../components/reviews/ReviewCard';

import { cleanup, render, screen } from '@testing-library/react';

import DisplayReviews from '../../../components/reviews/DisplayReviews';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

const reviewCardSpy = jest.spyOn(ReviewCard, 'default');
const firstReviewData = {
    author: 'firstAuthorId',
    recipe: 'recipeId',
    id: 'reviewId',
    stars: 'stars',
    comment: 'comment',
    image: '/image',
};
const secondReviewData = {
    author: 'secondAuthorId',
    recipe: 'recipeId2',
    id: 'reviewId2',
    stars: 'stars2',
    comment: 'comment2',
    image: '/image2',
};

const reviewsToDisplay = [firstReviewData, secondReviewData];

describe('DisplayReviews', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        render(
            <Provider store={store}>
                <DisplayReviews reviewsToDisplay={reviewsToDisplay} />
            </Provider>
        );
    });
    test('render without crashing', () => {});
    // test('should have called ReviewCard twice', () => {
    //     expect(reviewCardSpy.mock.calls.length).toBe(2);
    // });
    // test('should have called ReviewCard with the proper reviews data', () => {
    //     expect(reviewCardSpy.mock.calls[0][0].author).toBe(firstReviewData.author);
    //     expect(reviewCardSpy.mock.calls[0][0].stars).toBe(firstReviewData.stars);
    //     expect(reviewCardSpy.mock.calls[0][0].comment).toBe(firstReviewData.comment);
    //     expect(reviewCardSpy.mock.calls[0][0].image).toBe(firstReviewData.image);

    //     expect(reviewCardSpy.mock.calls[1][0].author).toBe(secondReviewData.author);
    //     expect(reviewCardSpy.mock.calls[1][0].stars).toBe(secondReviewData.stars);
    //     expect(reviewCardSpy.mock.calls[1][0].comment).toBe(secondReviewData.comment);
    //     expect(reviewCardSpy.mock.calls[1][0].image).toBe(secondReviewData.image);
    // });
});
