//  TODO - test recipesToDisplay param of DisplayRecipes is getting passed
//  TODO - test component without renders recipes

import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import DisplayRecipes from '../../components/recipes/DisplayRecipes';
import { loadRecipeListAction } from '../../redux/actions/recipe';

const recipeList = () => {
    const recipeListData = useSelector((state) => state.recipeReducer.recipeListData);
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            dispatch(loadRecipeListAction());
        } catch {
            // TODO - display err msg
        }
    }, [dispatch]);

    return (
        <main data-testid='recipeList'>
            {recipeListData ? <DisplayRecipes recipesToDisplay={recipeListData} /> : null}
        </main>
    );
};

export default connect()(recipeList);
