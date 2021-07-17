//  TODO - test recipesToDisplay param of DisplayRecipes is getting passed
//  TODO - test component without renders recipes

import DisplayRecipes from '../../components/recipes/DisplayRecipes';
import React from 'react';
import { loadRecipeListAction } from '../../redux/actions/recipe';
import { wrapper } from '../../redux/store';

const RecipeList = ({ listOfRecipes }) => {
    return (
        <main data-testid='recipeList'>
            {listOfRecipes ? <DisplayRecipes recipesToDisplay={listOfRecipes} /> : null}
        </main>
    );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(loadRecipeListAction());
    const listOfRecipes = store.getState().recipeReducer.listOfRecipes;

    return {
        props: {
            listOfRecipes,
        },
    };
});

export default RecipeList;
