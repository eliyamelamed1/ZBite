import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { saveUnSaveAction } from '../../redux/actions/recipeActions';

const SaveUnSave = ({ recipeId }) => {
    const dispatch = useDispatch();
    const [button, setButton] = useState('save');
    const { loggedUserData } = useSelector((state) => state.userReducer);

    useEffect(
        function toggleButtonText() {
            const isRecipeAlreadySaved = loggedUserData?.wishlist?.includes(recipeId);
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
            dispatch(saveUnSaveAction({ recipeId }));
        } catch {}
    };
    const authLinks = (
        <form onSubmit={(e) => onSubmit(e)}>
            <button>{button}</button>
        </form>
    );
    return <div>{authLinks}</div>;
};
export default SaveUnSave;
