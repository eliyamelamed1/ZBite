// test useEffect dispatch action
// test use list is displayed

import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import DisplayRecipes from './DisplayRecipes';
import { loadRecipeListAction } from '../../redux/actions/recipe';

const recipeList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            dispatch(loadRecipeListAction());
        } catch {
            // TODO - display err msg
        }
    }, [dispatch]);

    return (
        <main>
            <div data-testid='recipeList'></div>
            <DisplayRecipes />
        </main>
    );
};

export default connect()(recipeList);
