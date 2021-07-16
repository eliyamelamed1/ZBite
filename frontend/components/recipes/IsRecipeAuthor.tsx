// test propTypes
// test authorLinks, guestLinks
// test useEffect
// test logic

import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import RecipeDelete from './RecipeDelete';
import RecipeUpdate from './RecipeUpdate';

const IsRecipeAuthor = ({ recipe }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const { loggedUserData } = useSelector((state) => state.authReducer);
    const guestLinks = <div data-testid='guestLinks'>you are not the recipe author </div>;

    const authorLinks = (
        <div data-testid='authorLinks'>
            <RecipeDelete id={recipe.id} />
            <RecipeUpdate id={recipe.id} />
        </div>
    );

    useEffect(() => {
        if (loggedUserData != null) {
            if (recipe.author == loggedUserData.id) {
                setIsAuthor(true);
            }
        }
    }, [loggedUserData, recipe.author]);
    return <div data-testid='isRecipeAuthor'>{isAuthor ? authorLinks : guestLinks}</div>;
};

IsRecipeAuthor.propTypes = {
    recipe: PropTypes.object.isRequired,
};

export default connect()(IsRecipeAuthor);
