import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import ReviewCreate from './ReviewCreate';
import ReviewDelete from './ReviewDelete';
import { RootState } from '../../redux/store';
import UiOptionsDots from '../ui/UiOptionsDots';
import { useSelector } from 'react-redux';

interface Review {
    author: { id: string };
    id: string;
    recipe: string;
}
const IsReviewAuthor: React.FC<{ review: Review }> = ({ review }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const { loggedUserData } = useSelector((state: RootState) => state.userReducer);
    const authorLinks = <ReviewDelete reviewId={review.id} recipeId={review.recipe} />;

    useEffect(() => {
        {
            review?.author?.id === loggedUserData?.id ? setIsAuthor(true) : setIsAuthor(false);
        }
    }, [loggedUserData, review.author.id]);

    return <>{isAuthor ? authorLinks : null}</>;
};

export default IsReviewAuthor;
