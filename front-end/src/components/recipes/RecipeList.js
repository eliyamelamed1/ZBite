// test useEffect dispatch action
// test use list is displayed 

import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import DisplayRecipes from './DisplayRecipes';
import { loadRecipeListAction } from '../../redux/actions/recipe';
import { useSelector } from 'react-redux';

const recipeList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadRecipeListAction());
    }, [dispatch]);

    const { recipeListData } = useSelector((state) => state.recipeReducer);

    return (
        <main>
            <div data-testid='recipeList'></div>
            <DisplayRecipes recipes={recipeListData} />
        </main>
    );
};

export default connect()(recipeList);
