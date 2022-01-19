import store, { RootState } from '../redux/store';

import DisplayRecipes from '../components/recipes/DisplayRecipes';
import React from 'react';
import styles from '../styles/pages/home.module.scss';
import { useSelector } from 'react-redux';

const Search = () => {
    const { listOfAutoCompleteRecipes } = useSelector((state: RootState) => state.recipeReducer);

    return (
        <div className={styles.container}>
            <h1>Searched recipes</h1>
            <ul className={styles.recipes_container}>
                {listOfAutoCompleteRecipes && <DisplayRecipes recipesToDisplay={listOfAutoCompleteRecipes} />}
            </ul>
        </div>
    );
};

export default Search;
