import '@testing-library/jest-dom/extend-expect';

import * as MuiStarsRatings from '../../../components/mui/MuiStarsRatings';
import * as RecipeActions from '../../../redux/actions/recipeActions';

import { act, cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import ReviewCreate from '../../../components/reviews/ReviewCreate';
import Router from 'next/router';
import { TEST_CASE_AUTH } from '../../../redux/constants';
import { pageRoute } from '../../../enums';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

const reviewCreateActionSpy = jest.spyOn(RecipeActions, 'reviewCreateAction');
const muiStarsRatingsSpy = jest.spyOn(MuiStarsRatings, 'default');
jest.mock('next/router');

describe('ReviewCreate', () => {
    const recipeId = 'recipeId';
    describe('authenticated users', () => {
        beforeEach(() => {
            // disable unnecessary warnings

            cleanup();
            jest.clearAllMocks();
            const initialState = { isUserAuthenticated: true };
            store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
            render(
                <Provider store={store}>
                    <ReviewCreate recipeId={recipeId} />
                </Provider>
            );
        });
        describe('general', () => {
            test('renders without crashing', () => {});
            test('data-testid match reviewCreate', () => {
                const testid = screen.getByTestId('reviewCreate');
                expect(testid).toBeInTheDocument();
            });
        });
        describe('review button', () => {
            test('should render submit button', () => {
                const button = screen.getByRole('button', { name: /review/i });
                expect(button).toBeInTheDocument();
            });
            test('authenticated user should not be redirected upon clicking the button', () => {
                const button = screen.getByRole('button', { name: /review/i });

                userEvent.click(button);

                expect(Router.push.mock.calls.length).toBe(0);
            });
        });

        describe('reviewForm', () => {
            describe('before clicking the review button', () => {
                test('should not render comment textbox', () => {
                    const textbox = screen.queryByPlaceholderText(/comment/i);
                    expect(textbox).not.toBeInTheDocument();
                });

                test('should not render stars textbox', () => {
                    const textbox = screen.queryByPlaceholderText(/stars/i);
                    expect(textbox).not.toBeInTheDocument();
                });

                test('should not render submit button', () => {
                    const button = screen.queryByRole('button', { name: /submit/i });
                    expect(button).not.toBeInTheDocument();
                });
            });

            describe('after clicking the review button', () => {
                beforeEach(() => {
                    act(() => {
                        const button = screen.getByRole('button', { name: /review/i });
                        userEvent.click(button);
                    });
                });
                describe('comment input', () => {
                    test('render comment textbox', () => {
                        const textbox = screen.getByPlaceholderText(/comment/i);
                        expect(textbox).toBeInTheDocument();
                    });
                    test('comment attributes', () => {
                        const textbox = screen.getByPlaceholderText(/comment/i);
                        expect(textbox.required).toBe(true);
                        expect(textbox.type).toBe('text');
                        expect(textbox.name).toBe('comment');
                    });
                    test('comment value change according to input (onchange)', () => {
                        const textbox = screen.getByPlaceholderText(/comment/i);
                        userEvent.type(textbox, 'new comment');
                        expect(textbox.value).toBe('new comment');
                    });
                });
                describe('stars input', () => {
                    test('should render MuiStarsRatings', () => {
                        expect(muiStarsRatingsSpy).toHaveBeenCalled();
                    });
                });
                describe('submit button', () => {
                    test('should render submit button', () => {
                        const submitButton = screen.getByRole('button', { name: /submit/i });
                        expect(submitButton).toBeInTheDocument();
                    });
                    test('button type should be type submit', () => {
                        const submitButton = screen.getByRole('button', { name: /submit/i });
                        expect(submitButton.type).toBe('submit');
                    });
                    test('clicking the submit button should call dispatch reviewCreateActionSpy', async () => {
                        const commentTextbox = screen.getByPlaceholderText(/comment/i);
                        const starButton = screen.getByRole('radio', { name: '4.5 Stars' });
                        userEvent.type(commentTextbox, 'new comment');
                        userEvent.click(starButton);
                        const submitButton = screen.getByRole('button', { name: /submit/i });
                        userEvent.click(submitButton);
                        const timesActionDispatched = await reviewCreateActionSpy.mock.calls.length;
                        expect(timesActionDispatched).toBe(1);
                        expect(reviewCreateActionSpy.mock.calls[0][0].comment).toBe('new comment');
                        expect(reviewCreateActionSpy.mock.calls[0][0].stars).toBe('4.5');
                    });
                    test('authenticated user should not be redirected upon creating a review', () => {
                        const commentTextbox = screen.getByPlaceholderText(/comment/i);
                        const starButton = screen.getByRole('radio', { name: '4.5 Stars' });
                        const button = screen.getByRole('button', { name: /submit/i });

                        userEvent.type(commentTextbox, 'new comment');
                        userEvent.click(starButton);
                        userEvent.click(button);

                        expect(Router.push.mock.calls.length).toBe(0);
                    });
                });
            });
        });
    });
    describe('guest users', () => {
        beforeEach(() => {
            cleanup();
            jest.clearAllMocks();
            const initialState = { isUserAuthenticated: false };
            store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
            render(
                <Provider store={store}>
                    <ReviewCreate recipeId={recipeId} />
                </Provider>
            );
        });
        describe('general', () => {
            test('renders without crashing', () => {});
            test('data-testid match reviewCreate', () => {
                const testid = screen.getByTestId('reviewCreate');
                expect(testid).toBeInTheDocument();
            });
        });
        describe('review button', () => {
            test('should render review button', () => {
                const button = screen.getByRole('button', { name: /review/i });
                expect(button).toBeInTheDocument();
            });
            test('clicking the review button should redirect guest user to login page', async () => {
                await act(async () => {
                    const button = screen.getByRole('button', { name: /review/i });
                    await userEvent.click(button);
                });

                expect(Router.push.mock.calls.length).toBe(1);
                expect(Router.push.mock.calls[0][0]).toBe(pageRoute().login);
            });
        });
    });
});
