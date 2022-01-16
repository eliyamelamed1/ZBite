import React, { useState } from 'react';

import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard';
import UiSectionSeparator from '../ui/UiSectionSeperator';

interface Review {
    id: string;
    author: { name: string; id: string; photo_main: { src: string } | null };
    comment: string;
    image: File | null;
    stars: string;
    recipe: string;
    created_at: string;
}

const DisplayReviews = ({ reviewsToDisplay }) => {
    const getReviews = () => {
        if (reviewsToDisplay) {
            const reviewsOnPage = [];
            const result = [];

            reviewsToDisplay.map((review: Review) => {
                const formattedDate = new Date(review.created_at);
                reviewsOnPage.push(
                    <ReviewCard
                        author={review.author}
                        recipe={review.recipe}
                        id={review.id}
                        stars={review.stars}
                        comment={review.comment}
                        image={review.image}
                        created_at={Intl.DateTimeFormat('fr-FR').format(formattedDate)}
                    />
                );
            });
            for (let i = 0; i < reviewsToDisplay.length; i += 1) {
                result.push(
                    <div key={i}>
                        <div>{reviewsOnPage[i] && reviewsOnPage[i]}</div>
                        <br />
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
