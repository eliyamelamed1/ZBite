import PropTypes from 'prop-types';
import React from 'react';
import ReviewCard from './ReviewCard';

interface Review {
    id: string;
    author: { name: string; id: string; photo_main: { src: string } | null };
    comment: string;
    image: File | null;
    stars: string;
    recipe: string;
}

const DisplayReviews = ({ reviewsToDisplay }) => {
    const getReviews = () => {
        if (reviewsToDisplay) {
            const reviewsOnPage = [];
            const result = [];

            reviewsToDisplay.map((review: Review) => {
                review.stars = parseFloat(review.stars).toFixed(1);

                reviewsOnPage.push(
                    <ReviewCard
                        author={review.author}
                        recipe={review.recipe}
                        id={review.id}
                        stars={review.stars}
                        comment={review.comment}
                        image={review.image}
                    />
                );
            });
            for (let i = 0; i < reviewsToDisplay.length; i += 1) {
                result.push(
                    <div key={i}>
                        <div>{reviewsOnPage[i] ? reviewsOnPage[i] : null}</div>
                    </div>
                );
            }

            return result;
        } else {
            return null;
        }
    };
    return <div>{getReviews()}</div>;
};

DisplayReviews.propTypes = {
    reviewsToDisplay: PropTypes.array.isRequired,
};

export default DisplayReviews;
