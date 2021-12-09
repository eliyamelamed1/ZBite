// test propTypes
// test authorLinks, guestLinks
// test useEffect
// test logic

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import RecipeDelete from './RecipeDelete';
import RecipeUpdate from './RecipeUpdate';
import { useSelector } from 'react-redux';

interface Recipe {
    id: string;
    author: { id: string };
}

const IsRecipeAuthor: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const { loggedUserData } = useSelector((state) => state.userReducer);
    const guestLinks = <div data-testid='guestLinks'>you are not the recipe author </div>;

    const authorLinks = (
        <div data-testid='authorLinks'>
            <RecipeDelete id={recipe.id} />
            <RecipeUpdate id={recipe.id} />
        </div>
    );

    useEffect(() => {
        if (loggedUserData != null) {
            if (recipe?.author?.id == loggedUserData.id) {
                setIsAuthor(true);
            }
        }
    }, [loggedUserData, recipe.author.id]);
    return <div data-testid='isRecipeAuthor'>{isAuthor ? authorLinks : guestLinks}</div>;
};

export default IsRecipeAuthor;
