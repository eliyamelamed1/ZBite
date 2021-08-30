import PropTypes from 'prop-types';
import { reviewsInRecipeAction } from '../../redux/actions/reviewsActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const ReviewsInRecipe = ({ recipeId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            dispatch(reviewsInRecipeAction({ recipe: recipeId }));
        } catch {}
    }, [dispatch, recipeId]);
};

ReviewsInRecipe.propTypes = {
    recipeId: PropTypes.string.isRequired,
};
export default ReviewsInRecipe;
