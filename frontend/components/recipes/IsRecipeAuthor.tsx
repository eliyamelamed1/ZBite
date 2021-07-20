// test propTypes
// test authorLinks, guestLinks
// test useEffect
// test logic

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import RecipeDelete from './RecipeDelete';
import RecipeUpdate from './RecipeUpdate';
import { useSelector } from 'react-redux';

const IsRecipeAuthor = ({ recipe }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const { loggedUserDetails } = useSelector((state) => state.authReducer);
    const guestLinks = <div data-testid='guestLinks'>you are not the recipe author </div>;

    const authorLinks = (
        <div data-testid='authorLinks'>
            <RecipeDelete id={recipe.id} />
            <RecipeUpdate id={recipe.id} />
        </div>
    );

    useEffect(() => {
        if (loggedUserDetails != null) {
            if (recipe.author == loggedUserDetails.id) {
                setIsAuthor(true);
            }
        }
    }, [loggedUserDetails, recipe.author]);
    return <div data-testid='isRecipeAuthor'>{isAuthor ? authorLinks : guestLinks}</div>;
};

IsRecipeAuthor.propTypes = {
    recipe: PropTypes.object.isRequired,
};

export default IsRecipeAuthor;
