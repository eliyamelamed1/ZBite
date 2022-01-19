import DisplayRecipes from '../components/recipes/DisplayRecipes';
import React from 'react';
import { RootState } from '../redux/store';
import UiRecipesContainer from '../components/ui/UiRecipesContainer';
import UiSectionSeparator from '../components/ui/UiSectionSeperator';
import styles from '../styles/pages/search.module.scss';
import { useSelector } from 'react-redux';

const Search = () => {
    const { listOfAutoCompleteRecipes } = useSelector((state: RootState) => state.recipeReducer);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Searched recipes</h1>
            <UiSectionSeparator />
            <UiRecipesContainer>
                {listOfAutoCompleteRecipes && <DisplayRecipes recipesToDisplay={listOfAutoCompleteRecipes} />}
            </UiRecipesContainer>
        </div>
    );
};

export default Search;
