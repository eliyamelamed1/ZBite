import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { saveRecipeAction } from '../../redux/actions/recipeActions';

const SaveRecipe: React.FC<{ recipeId: string }> = ({ recipeId }) => {
    const dispatch = useDispatch();
    const [button, setButton] = useState('save');
    const { loggedUserData } = useSelector((state: RootState) => state.userReducer);

    useEffect(
        function toggleButtonText() {
            const isRecipeAlreadySaved = loggedUserData?.saved_recipes?.includes(recipeId);
            if (isRecipeAlreadySaved) {
                setButton('unsave');
            } else {
                setButton('save');
            }
        },
        [dispatch, loggedUserData, recipeId]
    );

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(saveRecipeAction({ recipeId }));
        } catch {}
    };
    const authLinks = (
        <form onSubmit={(e) => onSubmit(e)}>
            <button>{button}</button>
        </form>
    );
    return <div>{authLinks}</div>;
};
export default SaveRecipe;
