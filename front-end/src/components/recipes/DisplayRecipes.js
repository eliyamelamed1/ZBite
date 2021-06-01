import PropTypes from 'prop-types';
import React from 'react';
import RecipeCard from './RecipeCard';

const displayRecipes = ({ recipes }) => {
    const getRecipes = () => {
        const recipesOnPage = [];
        const result = [];

        recipes.map((recipe) =>
            recipesOnPage.push(
                <RecipeCard
                    title={recipe.title}
                    flavor_type={recipe.flavor_type}
                    photo_main={recipe.photo_main}
                    id={recipe.id}
                    author={recipe.author}
                />
            )
        );

        // 3 is for 3 recipes on page
        for (let i = 0; i < recipes.length; i += 1) {
            result.push(
                <div key={i}>
                    <div>{recipesOnPage[i] ? recipesOnPage[i] : null}</div>
                </div>
            );
        }

        return result;
    };
    return <div data-testid='displayRecipes'>{recipes ? getRecipes() : null}</div>;
};

displayRecipes.propTypes = {
    recipes: PropTypes.array.isRequired,
};

export default displayRecipes;
