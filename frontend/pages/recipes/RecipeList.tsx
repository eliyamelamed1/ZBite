//  TODO - test recipesToDisplay param of DisplayRecipes is getting passed
//  TODO - test component without renders recipes

import DisplayRecipes from '../../components/recipes/DisplayRecipes';
import React from 'react';
import { loadRecipeListAction } from '../../redux/actions/recipe';
import { wrapper } from '../../redux/store';

const RecipeList = ({ recipeListData }) => {
    return (
        <main data-testid='recipeList'>
            {recipeListData ? <DisplayRecipes recipesToDisplay={recipeListData} /> : null}
        </main>
    );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(loadRecipeListAction());
    const recipeListData = store.getState().recipeReducer.recipeListData;

    return {
        props: {
            recipeListData,
        },
    };
});

export default RecipeList;
