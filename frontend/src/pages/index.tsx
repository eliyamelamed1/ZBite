import React, { useEffect, useRef, useState } from 'react';
import { loadFollowedRecipesAction, loadTrendingRecipesAction } from '../redux/actions/recipeActions';
import { pageRoute, typeOfRecipesEnum } from '../enums';
import store, { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import DisplayRecipes from '../components/recipes/DisplayRecipes';
import Router from 'next/router';
import UiRatingForm from '../components/ui/UiRatingForm';
import UiRecipesContainer from '../components/ui/UiRecipesContainer';
import UiSectionSeparator from '../components/ui/UiSectionSeperator';
import styles from '../styles/pages/home.module.scss';

interface Recipe {
    id: string;
    author: { name: string; id: string };
    title: string;
    photo_main: string;
    saves: string[];
    stars: string;
}

const HomePage: React.FC<{ listOfTrendingRecipes: Recipe[] }> = (props) => {
    console.log(process.env.NODE_ENV);

    const dispatch = useDispatch();
    const [typeOfRecipes, setTypeOfRecipes] = useState(typeOfRecipesEnum.trending);
    const buttonsRef = useRef() as any;
    const onClick = (e) => {
        if (e.target.name === typeOfRecipesEnum.trending) {
            buttonsRef.current.children[0].className = styles.active;
            buttonsRef.current.children[1].className = '';
        }
        if (e.target.name === typeOfRecipesEnum.following) {
            buttonsRef.current.children[0].className = '';
            buttonsRef.current.children[1].className = styles.active;
        }
    };
    const { listOfTrendingRecipes } = props;
    const { listOfFollowedRecipes } = useSelector((state: RootState) => state.recipeReducer);
    const { isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);

    if (typeOfRecipes === typeOfRecipesEnum.following && isUserAuthenticated === false) Router.push(pageRoute().login);

    useEffect(() => {
        if (typeOfRecipes === typeOfRecipesEnum.following) {
            try {
                dispatch(loadFollowedRecipesAction());
            } catch {}
        }
    }, [typeOfRecipes, dispatch]);

    return (
        <div className={styles.container}>
            <ul className={styles.recipe_filter} ref={buttonsRef} onClick={onClick}>
                <button
                    className={styles.active}
                    name={typeOfRecipesEnum.trending}
                    onClick={() => setTypeOfRecipes(typeOfRecipesEnum.trending)}
                >
                    Trending
                </button>
                <button
                    name={typeOfRecipesEnum.following}
                    onClick={() => setTypeOfRecipes(typeOfRecipesEnum.following)}
                >
                    Following
                </button>
            </ul>
            <UiSectionSeparator />
            <UiRecipesContainer>
                {typeOfRecipes === typeOfRecipesEnum.trending && listOfTrendingRecipes && (
                    <DisplayRecipes recipesToDisplay={listOfTrendingRecipes} />
                )}
                {typeOfRecipes === typeOfRecipesEnum.following && listOfFollowedRecipes && (
                    <DisplayRecipes recipesToDisplay={listOfFollowedRecipes} />
                )}
            </UiRecipesContainer>
        </div>
    );
};

export async function getServerSideProps() {
    await store.dispatch(loadTrendingRecipesAction());
    const { listOfTrendingRecipes } = store.getState().recipeReducer;

    return { props: { listOfTrendingRecipes } };
}

export default HomePage;
