import PropTypes from 'prop-types';
import React from 'react';
import ReviewCard from './ReviewCard';

const DisplayReviews = ({ reviewsToDisplay }) => {
    const getReviews = () => {
        if (reviewsToDisplay) {
            const reviewsOnPage = [];
            const result = [];

            reviewsToDisplay.map((review) =>
                reviewsOnPage.push(
                    <ReviewCard
                        author={review.author}
                        stars={review.stars}
                        comment={review.comment}
                        image={review.image}
                    />
                )
            );
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
