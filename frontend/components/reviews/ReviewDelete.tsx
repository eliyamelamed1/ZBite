import PropTypes from 'prop-types';
import React from 'react';
import { reviewDeleteAction } from '../../redux/actions/recipeActions';
import { useDispatch } from 'react-redux';

const ReviewDelete: React.FC<{ reviewId: string; recipeId: string }> = ({ reviewId, recipeId }) => {
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(reviewDeleteAction({ reviewId, recipeId }));
        } catch {}
    };

    return (
        <div data-testid='reviewDelete'>
            <form onSubmit={onSubmit}>
                <button type='submit'>delete review</button>
            </form>
        </div>
    );
};

ReviewDelete.propTypes = {
    reviewId: PropTypes.string.isRequired,
};

export default ReviewDelete;
