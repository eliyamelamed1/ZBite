import { useDispatch, useSelector } from 'react-redux';

import DisplayRecipes from '../../components/recipes/DisplayRecipes';
import { RootState } from '../../redux/store';
import Router from 'next/router';
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
            console.log(isUserAuthenticated);
            dispatch(loadSavedRecipesAction());
        }
    }, [dispatch]);

    return (
        <section className={styles.container}>
            {listOfSavedRecipes && (
                <div className={styles.recipes_container}>
                    <DisplayRecipes recipesToDisplay={listOfSavedRecipes} />
                </div>
            )}
        </section>
    );
};
export default SavedRecipes;
