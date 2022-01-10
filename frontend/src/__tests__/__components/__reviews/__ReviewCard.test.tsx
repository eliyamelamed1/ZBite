import '@testing-library/jest-dom/extend-expect';

import * as IsReviewAuthor from '../../../components/reviews/isReviewAuthor';

import { cleanup, render, screen } from '@testing-library/react';
import { pageRoute, reviewParams } from '../../../enums';

import { Provider } from 'react-redux';
import ReviewCard from '../../../components/reviews/ReviewCard';
import store from '../../../redux/store';

const IsReviewAuthorSpy = jest.spyOn(IsReviewAuthor, 'default');
describe('ReviewCard', () => {
    beforeEach(() => {
        cleanup();
        render(
            <Provider store={store}>
                <ReviewCard
                    author={reviewParams.author}
                    recipe={reviewParams.recipe}
                    id={reviewParams.id}
                    stars={reviewParams.stars}
                    comment={reviewParams.comment}
                    image={reviewParams.image}
                    created_at={reviewParams.created_at}
                />
            </Provider>
        );
    });
    test('should render without crashing', () => {});
    test('should match data test id', () => {
        const dataTestId = screen.getByTestId('reviewCard');
        expect(dataTestId).toBeInTheDocument();
    });
    test('should render review details', () => {
        const author = screen.getByText(reviewParams.author.name);
        const stars = screen.getByText(`(${reviewParams.stars}.0)`);
        const comment = screen.getByText(reviewParams.comment);
        const created_at = screen.getByText(`${reviewParams.created_at.slice(0, 10)}`);
        // const image = screen.getByRole('img', { name: 'Review Image' });

        expect(author).toBeInTheDocument();
        expect(stars).toBeInTheDocument();
        expect(comment).toBeInTheDocument();
        expect(created_at).toBeInTheDocument();
        // expect(image).toBeInTheDocument();
    });
    test('should link author to his profile page', () => {
        const authorProfileUrl = screen.getByRole('link', { name: reviewParams.author.name });
        const url = pageRoute(reviewParams.author.id).profile;

        expect(authorProfileUrl.href).toContain('http://localhost' + url);
    });
    test('should render IsReviewAuthor', () => {
        expect(IsReviewAuthorSpy).toHaveBeenCalled();
    });
    test('should render IsReviewAuthor with proper credentials', () => {
        expect(IsReviewAuthorSpy.mock.calls[0][0].review).toEqual(reviewParams);
    });
});
