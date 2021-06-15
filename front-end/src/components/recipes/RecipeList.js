import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { loadRecipeListAction } from '../../redux/actions/recipe';

const recipeList = ({ loadRecipeListAction }) => {
    useEffect(() => {
        loadRecipeListAction();
    }, []);

    return (
        <main>
            <div data-testid='recipeList'></div>
        </main>
    );
};

export default connect(null, { loadRecipeListAction })(recipeList);
