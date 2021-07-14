import { connect, useSelector } from 'react-redux';

import DisplayRecipes from '../components/recipes/DisplayRecipes';
import Head from 'next/head';
import React from 'react';
import RecipeSearch from '../components/recipes/RecipeSearch';

const homePage = () => {
    const recipeSearchedListData = useSelector((state) => state.recipeReducer.recipeSearchedListData);
    console.log(recipeSearchedListData);
    return (
        <React.Fragment>
            <Head>
                <title>ZBite - Home</title>
                <meta name='description' content='ZBite Home Page' />
            </Head>
            <main data-testid='homePage'>
                <section>
                    <RecipeSearch />
                    {recipeSearchedListData ? <DisplayRecipes recipesToDisplay={recipeSearchedListData} /> : null}
                </section>
            </main>
        </React.Fragment>
    );
};

export default connect()(homePage);
