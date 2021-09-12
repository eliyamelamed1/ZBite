import '@testing-library/jest-dom/extend-expect';

import * as ReviewCreate from '../../../components/reviews/ReviewCreate';
import * as ReviewDelete from '../../../components/reviews/ReviewDelete';

import { cleanup, render, screen } from '@testing-library/react';

import IsReviewAuthor from '../../../components/reviews/isReviewAuthor';
import { Provider } from 'react-redux';
import React from 'react';
import { TEST_CASE_AUTH } from '../../../redux/types';
import store from '../../../redux/store';

const ReviewDeleteSpy = jest.spyOn(ReviewDelete, 'default');
const ReviewCreateSpy = jest.spyOn(ReviewCreate, 'default');

describe('isReviewAuthor', () => {
    describe('author', () => {
        const review = {
            author: 'eliya',
            id: '1',
            recipe: 'recipeId',
            comment: 'yummy',
            stars: '5',
        };
        const initialState = {
            isUserAuthenticated: true,
            loggedUserData: { id: 'eliya' },
        };
        beforeEach(() => {
            cleanup();
            jest.clearAllMocks();
            store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
            render(
                <Provider store={store}>
                    <IsReviewAuthor review={review} />
                </Provider>
            );
        });
        test('should render without crashing', () => {});
        test('should render reviewDelete', () => {
            expect(ReviewDeleteSpy.mock.calls.length).toBe(1);
            expect(ReviewDeleteSpy.mock.calls[0][0].reviewId).toEqual(review.id);
            expect(ReviewDeleteSpy.mock.calls[0][0].recipeId).toEqual(review.recipe);
        });
    });
    describe('not author', () => {
        const review = {
            author: 'eliya',
            id: '1',
            recipe: 'recipeId',
            comment: 'yummy',
            stars: '5',
        };
        const initialState = {
            isUserAuthenticated: true,
            loggedUserData: { id: 'aviv' },
        };
        beforeEach(() => {
            cleanup();
            jest.clearAllMocks();
            store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
            render(
                <Provider store={store}>
                    <IsReviewAuthor review={review} />
                </Provider>
            );
        });
        test('should render without crashing', () => {});
        test('should render reviewDelete', () => {
            expect(ReviewDeleteSpy.mock.calls.length).toBe(0);
        });
    });
});
