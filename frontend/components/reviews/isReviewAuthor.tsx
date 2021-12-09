import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import ReviewCreate from './ReviewCreate';
import ReviewDelete from './ReviewDelete';
import { useSelector } from 'react-redux';

interface Review {
    author: { id: string };
    id: string;
    recipe: string;
}
const IsReviewAuthor: React.FC<{ review: Review }> = ({ review }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const { loggedUserData } = useSelector((state) => state.userReducer);
    const authorLinks = (
        <div>
            <ReviewDelete reviewId={review.id} recipeId={review.recipe} />
        </div>
    );

    useEffect(() => {
        {
            review?.author?.id === loggedUserData?.id ? setIsAuthor(true) : setIsAuthor(false);
        }
    }, [loggedUserData, review.author.id]);

    return <div>{isAuthor ? authorLinks : null}</div>;
};

export default IsReviewAuthor;
