// test propTypes
// test recipes displayed

import React from 'react';
import RecipeCard from './RecipeCard';

interface Recipe {
    title: string;
    photo_main: string;
    id: string;
    author: { name: string; id: string };
    saves: string[];
    stars: string;
}

interface DataTypes {
    recipesToDisplay: Recipe[];
}

const DisplayRecipes: React.FC<DataTypes> = ({ recipesToDisplay }) => {
    const getRecipes = () => {
        if (recipesToDisplay) {
            const recipesOnPage = [];
            const result = [];
            recipesToDisplay.map((recipe) =>
                recipesOnPage.push(
                    <RecipeCard
                        title={recipe.title}
                        photo_main={recipe.photo_main}
                        id={recipe.id}
                        author={recipe.author}
                        saves={recipe.saves}
                        stars={recipe.stars}
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
    return <>{getRecipes()}</>;
};

export default DisplayRecipes;
