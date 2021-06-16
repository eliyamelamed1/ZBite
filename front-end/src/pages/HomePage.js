import { Helmet, HelmetProvider } from 'react-helmet-async';
import { connect, useSelector } from 'react-redux';

import DisplayRecipes from '../components/recipes/DisplayRecipes';
import React from 'react';
import RecipeSearch from '../components/recipes/RecipeSearch';

const homePage = () => {
    const recipeSearchedListData = useSelector((state) => state.recipeReducer.recipeSearchedListData);
    return (
        <main data-testid='homePage'>
            <HelmetProvider>
                <Helmet>
                    <title>ZBite - Home</title>
                    <meta name='description' content='ZBite Home Page' />
                </Helmet>
            </HelmetProvider>
            <section>
                <RecipeSearch />
            </section>
            <section>
                <DisplayRecipes recipes={recipeSearchedListData} />
            </section>
        </main>
    );
};

export default connect(null, null)(homePage);
