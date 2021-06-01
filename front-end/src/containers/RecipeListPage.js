import { Helmet, HelmetProvider } from 'react-helmet-async';

import DisplayRecipes from '../components/recipes/DisplayRecipes';
import React from 'react';
import RecipeList from '../components/recipes/RecipeList';
import { connect } from 'react-redux';

const recipeListPage = ({ recipeListData }) => {
    return (
        <main data-testid='recipesPage'>
            <HelmetProvider>
                <Helmet>
                    <title>ZBite - Recipes</title>
                    <meta name='description' content='Recipes page' />
                </Helmet>
            </HelmetProvider>
            <section>
                <RecipeList />
            </section>
            <DisplayRecipes recipes={recipeListData} />
        </main>
    );
};

const mapStateToProps = (state) => ({
    recipeListData: state.recipeReducer.recipeListData,
});

export default connect(mapStateToProps, null)(recipeListPage);
