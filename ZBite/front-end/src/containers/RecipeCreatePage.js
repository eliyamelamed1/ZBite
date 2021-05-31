import { Helmet, HelmetProvider } from 'react-helmet-async';

import React from 'react';
import RecipeCreate from '../components/recipes/RecipeCreate';

const recipeCreatePage = () => {
    return (
        <main data-testid='recipeCreatePage'>
            <HelmetProvider>
                <Helmet>
                    <title>ZBite - Create Page</title>
                    <meta name='description' content='ZBite Home Page' />
                </Helmet>
            </HelmetProvider>
            <section>
                <RecipeCreate />
            </section>
        </main>
    );
};

export default recipeCreatePage;
