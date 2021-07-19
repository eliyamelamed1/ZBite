//  TODO - test recipesToDisplay param of DisplayRecipes is getting passed
//  TODO - test component without renders recipes

import DisplayRecipes from '../../components/recipes/DisplayRecipes';
import React from 'react';
import { loadRecipeListAction } from '../../redux/actions/recipe';
import { useSelector } from 'react-redux';
import { wrapperStore } from '../../redux/store';

const RecipeList = () => {
    const { listOfRecipes } = useSelector((state) => state.recipeReducer);
    return (
        <main data-testid='recipeList'>
            {listOfRecipes ? <DisplayRecipes recipesToDisplay={listOfRecipes} /> : null}
        </main>
    );
};

export const getStaticProps = wrapperStore.getStaticProps((store) => async () => {
    await store.dispatch(loadRecipeListAction());
});

export default RecipeList;
