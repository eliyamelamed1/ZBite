import React, { useEffect } from 'react';

import DisplayRecipes from './DisplayRecipes';
import { connect } from 'react-redux';
import { loadRecipeListAction } from '../../redux/actions/recipe';
import { useSelector } from 'react-redux';

const recipeList = ({ loadRecipeListAction }) => {
    useEffect(() => {
        loadRecipeListAction();
    }, []);

    const { recipeListData } = useSelector((state) => state.recipeReducer);

    return (
        <main>
            <div data-testid='recipeList'></div>
            <DisplayRecipes recipes={recipeListData} />
        </main>
    );
};

export default connect(null, { loadRecipeListAction })(recipeList);
