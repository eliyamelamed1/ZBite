import * as ReviewCard from '../../../components/reviews/ReviewCard';

import { cleanup, render, screen } from '@testing-library/react';

import DisplayReviews from '../../../components/reviews/DisplayReviews';

const reviewCardSpy = jest.spyOn(ReviewCard, 'default');
const firstReviewData = {
    author: 'firstAuthorId',
    stars: 'stars',
    comment: 'comment',
    image: '/image',
};
const secondReviewData = {
    author: 'secondAuthorId',
    stars: 'stars2',
    comment: 'comment2',
    image: '/image2',
};

const reviewsToDisplay = [firstReviewData, secondReviewData];

describe('DisplayReviews', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        render(<DisplayReviews reviewsToDisplay={reviewsToDisplay} />);
    });
    test('render without crashing', () => {});
    test('should have called ReviewCard twice', () => {
        expect(reviewCardSpy.mock.calls.length).toBe(2);
    });
    test('should have called ReviewCard with the proper reviews data', () => {
        expect(reviewCardSpy.mock.calls[0][0]).toEqual(firstReviewData);
        expect(reviewCardSpy.mock.calls[1][0]).toEqual(secondReviewData);
    });
});
