// test propTypes
// test recipes displayed

import PropTypes from 'prop-types';
import React from 'react';
import RecipeCard from './RecipeCard';

const DisplayRecipes = ({ recipesToDisplay }) => {
    const getRecipes = () => {
        if (recipesToDisplay) {
            const recipesOnPage = [];
            const result = [];
            recipesToDisplay.map((recipe) =>
                recipesOnPage.push(
                    <RecipeCard
                        title={recipe.title}
                        flavor_type={recipe.flavor_type}
                        photo_main={recipe.photo_main}
                        id={recipe.id}
                        author={recipe.author}
                        // saves={recipe.saves.length}
                        // stars={recipe.stars || 'not rated'}
                    />
                )
            );

            // 3 is for 3 recipes on page
            for (let i = 0; i < recipesToDisplay.length; i += 1) {
                result.push(
                    <div key={i}>
                        <div>{recipesOnPage[i] && recipesOnPage[i]}</div>
                    </div>
                );
            }

            return result;
        } else {
            return null;
        }
    };
    return <div data-testid='displayRecipes'>{getRecipes()}</div>;
};

DisplayRecipes.propTypes = {
    recipesToDisplay: PropTypes.array.isRequired,
};

export default DisplayRecipes;
