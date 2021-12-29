import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import Router from 'next/router';
import UiButton from '../ui/UiButton';
import { pageRoute } from '../../enums';
import { saveRecipeAction } from '../../redux/actions/recipeActions';

const SaveRecipe: React.FC<{ recipeId: string }> = ({ recipeId }) => {
    const dispatch = useDispatch();
    const [button, setButton] = useState('save');
    const { loggedUserData, isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);

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

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isUserAuthenticated) await Router.push(pageRoute().login);
        try {
            dispatch(saveRecipeAction({ recipeId }));
        } catch {}
    };
    const authLinks = (
        <form onSubmit={(e) => onSubmit(e)}>
            <UiButton reverse={false}>{button}</UiButton>
        </form>
    );
    return <div>{authLinks}</div>;
};
export default SaveRecipe;
