import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import ReviewCreate from './ReviewCreate';
import ReviewDelete from './ReviewDelete';
import { useSelector } from 'react-redux';

const IsReviewAuthor = ({ review }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const { loggedUserData } = useSelector((state) => state.userReducer);
    const authorLinks = (
        <div>
            <ReviewDelete reviewId={review.id} recipeId={review.recipe} />
            <ReviewCreate recipeId={review.recipe} />
        </div>
    );

    useEffect(() => {
        try {
            {
                review.author === loggedUserData.id ? setIsAuthor(true) : setIsAuthor(false);
            }
        } catch {}
    }, [loggedUserData, review.author]);

    return <div>{isAuthor ? authorLinks : null}</div>;
};

IsReviewAuthor.propTypes = {
    review: PropTypes.object.isRequired,
};

export default IsReviewAuthor;
