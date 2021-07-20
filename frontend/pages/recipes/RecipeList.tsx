//  TODO - test recipesToDisplay param of DisplayRecipes is getting passed
//  TODO - test component without renders recipes

import DisplayRecipes from '../../components/recipes/DisplayRecipes';
import React from 'react';
import { loadRecipeListAction } from '../../redux/actions/recipe';
import { store } from '../../redux/store';

const RecipeList = ({ listOfRecipes }) => {
    return (
        <main data-testid='recipeList'>
            {listOfRecipes ? <DisplayRecipes recipesToDisplay={listOfRecipes} /> : null}
        </main>
    );
};

export async function getStaticProps(context) {
    await store.dispatch(loadRecipeListAction());
    const { listOfRecipes } = await store.getState().recipeReducer;

    return { props: { listOfRecipes }, revalidate: 10 };
}

export default RecipeList;
