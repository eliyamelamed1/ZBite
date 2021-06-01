import { Helmet, HelmetProvider } from 'react-helmet-async';

import DisplayRecipes from '../components/recipes/DisplayRecipes';
import React from 'react';
import RecipeSearch from '../components/recipes/RecipeSearch';
import { connect } from 'react-redux';

const homePage = ({ recipeSearchedListData }) => {
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

const mapStateToProps = (state) => ({
    recipeSearchedListData: state.recipeReducer.recipeSearchedListData,
});

export default connect(mapStateToProps, null)(homePage);
