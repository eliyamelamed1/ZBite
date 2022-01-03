import PropTypes from 'prop-types';
import React from 'react';
import UiButton from '../ui/UiButton';
import { reviewDeleteAction } from '../../redux/actions/recipeActions';
import styles from '../../styles/components/reviewCard.module.scss';
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
        <>
            <form onSubmit={onSubmit} className={styles.delete_button}>
                <UiButton reverse={true}>delete review</UiButton>
            </form>
        </>
    );
};

export default ReviewDelete;
