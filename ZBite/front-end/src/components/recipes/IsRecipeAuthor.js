import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import RecipeDelete from './RecipeDelete';
import RecipeUpdate from './RecipeUpdate';
import { connect } from 'react-redux';

const isRecipeAuthor = ({ recipe, loggedUser }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const guestLinks = <div data-testid='guestLinks'>you are not the recipe author </div>;

    const authorLinks = (
        <div data-testid='authorLinks'>
            <RecipeDelete id={recipe.id} />
            <RecipeUpdate id={recipe.id} />
        </div>
    );

    useEffect(() => {
        if (loggedUser != null) {
            if (recipe.author == loggedUser.id) {
                setIsAuthor(true);
            }
        }
    });
    return <div>{isAuthor ? authorLinks : guestLinks}</div>;
};

const mapStateToProps = (state) => ({
    loggedUser: state.authReducer.loggedUser,
});
isRecipeAuthor.propTypes = {
    recipe: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(isRecipeAuthor);

// add proptypes
