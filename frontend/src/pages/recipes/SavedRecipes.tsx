import { useDispatch, useSelector } from 'react-redux';

import DisplayRecipes from '../../components/recipes/DisplayRecipes';
import { RootState } from '../../redux/store';
import Router from 'next/router';
import UiRecipesContainer from '../../components/ui/UiRecipesContainer';
import { loadSavedRecipesAction } from '../../redux/actions/recipeActions';
import { pageRoute } from '../../enums';
import styles from '../../styles/pages/home.module.scss';
import { useEffect } from 'react';

const SavedRecipes = () => {
    const dispatch = useDispatch();
    const { listOfSavedRecipes } = useSelector((state: RootState) => state.recipeReducer);
    const { isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);

    useEffect(() => {
        if (!isUserAuthenticated) Router.push(pageRoute().login);
        if (isUserAuthenticated) {
            try {
                dispatch(loadSavedRecipesAction());
            } catch {}
        }
    }, [dispatch]);

    return (
        <section className={styles.container}>
            {listOfSavedRecipes && (
                <UiRecipesContainer>
                    <DisplayRecipes recipesToDisplay={listOfSavedRecipes} />
                </UiRecipesContainer>
            )}
        </section>
    );
};
export default SavedRecipes;
