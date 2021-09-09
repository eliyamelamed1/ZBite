import PropTypes from 'prop-types';
import React from 'react';
import { reviewDeleteAction } from '../../redux/actions/reviewsActions';
import { useDispatch } from 'react-redux';

const ReviewDelete = ({ id }) => {
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(reviewDeleteAction({ id }));
        } catch {}
    };

    return (
        <div data-testid='reviewDelete'>
            <form onSubmit={(e) => onSubmit(e)}>
                <button type='submit'>delete</button>
            </form>
        </div>
    );
};

ReviewDelete.propTypes = {
    id: PropTypes.string.isRequired,
};

export default ReviewDelete;
