import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import RecipeDelete from './RecipeDelete';
import RecipeUpdate from './RecipeUpdate';

const isRecipeAuthor = ({ recipe }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const guestLinks = <div data-testid='guestLinks'>you are not the recipe author </div>;
    const loggedUserData = useSelector((state) => state.authReducer.loggedUserData);

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
    });
    return <div>{isAuthor ? authorLinks : guestLinks}</div>;
};

isRecipeAuthor.propTypes = {
    recipe: PropTypes.object.isRequired,
};

export default connect()(isRecipeAuthor);

// add proptypes
