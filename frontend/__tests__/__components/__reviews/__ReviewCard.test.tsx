import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';
import { pageRoute, reviewParams, userParams } from '../../../globals';

import ReviewCard from '../../../components/reviews/ReviewCard';

describe('ReviewCard', () => {
    describe('requiredProps + optionalProps ', () => {
        beforeEach(() => {
            cleanup();
            render(
                <ReviewCard
                    author={reviewParams.author}
                    stars={reviewParams.stars}
                    comment={reviewParams.comment}
                    image={reviewParams.image}
                />
            );
        });
        test('should render without crashing', () => {});
        test('should match data test id', () => {
            const dataTestId = screen.getByTestId('reviewCard');
            expect(dataTestId).toBeInTheDocument();
        });
        test('should render review details', () => {
            const author = screen.getByText(reviewParams.author);
            const stars = screen.getByText(reviewParams.stars);
            const comment = screen.getByText(reviewParams.comment);
            const image = screen.getByRole('img', { name: 'Review Image' });

            expect(author).toBeInTheDocument();
            expect(stars).toBeInTheDocument();
            expect(comment).toBeInTheDocument();
            expect(image).toBeInTheDocument();
        });
        test('should link author to his profile page', () => {
            const authorProfileUrl = screen.getByRole('link', { name: reviewParams.author });
            const url = pageRoute(reviewParams.author).profile;

            expect(authorProfileUrl.href).toContain('http://localhost' + url);
        });
    });
    describe('only requiredProps', () => {
        beforeEach(() => {
            cleanup();
            render(<ReviewCard author={reviewParams.author} stars={reviewParams.stars} />);
        });
        test('should render without crashing', () => {});
        test('should match data test id', () => {
            const dataTestId = screen.getByTestId('reviewCard');
            expect(dataTestId).toBeInTheDocument();
        });
        test('should render review details', () => {
            const author = screen.getByText(reviewParams.author);
            const stars = screen.getByText(reviewParams.stars);
            const comment = screen.queryByText(reviewParams.comment);
            const image = screen.queryByRole('img', { name: 'Review Image' });

            expect(author).toBeInTheDocument();
            expect(stars).toBeInTheDocument();
            expect(comment).not.toBeInTheDocument();
            expect(image).not.toBeInTheDocument();
        });
        test('should link author to his profile page', () => {
            const authorProfileUrl = screen.getByRole('link', { name: reviewParams.author });
            const url = pageRoute(reviewParams.author).profile;

            expect(authorProfileUrl.href).toContain('http://localhost' + url);
        });
    });
});
