import React, { useEffect, useRef, useState } from 'react';
import {
    loadFollowedRecipesAction,
    loadRecipeListAction,
    loadTrendingRecipesAction,
} from '../redux/actions/recipeActions';
import { useDispatch, useSelector } from 'react-redux';

import DisplayRecipes from '../components/recipes/DisplayRecipes';
import classes from '../styles/pages/home.module.scss';
import store from '../redux/store';

const HomePage = (props) => {
    const dispatch = useDispatch();
    const [typeOfRecipes, setTypeOfRecipes] = useState('Trending');
    const buttonsRef = useRef() as any;
    const onClick = (e) => {
        if (e.target.name === 'trending') {
            buttonsRef.current.children[0].className = classes.active;
            buttonsRef.current.children[1].className = '';
        }
        if (e.target.name === 'Following') {
            buttonsRef.current.children[0].className = '';
            buttonsRef.current.children[1].className = classes.active;
        }
    };
    const { listOfTrendingRecipes } = props;
    const listOfFollowedRecipes = useSelector((state) => state.recipeReducer.listOfFollowedRecipes);

    useEffect(() => {
        if (typeOfRecipes === 'Following') {
            try {
                dispatch(loadFollowedRecipesAction());
            } catch {}
        }
    }, [typeOfRecipes, dispatch]);

    return (
        <div className={classes.container}>
            <ul className={classes.recipe_filter} ref={buttonsRef} onClick={onClick}>
                <button className={classes.active} name='trending' onClick={() => setTypeOfRecipes('Trending')}>
                    Trending
                </button>
                <button name='Following' onClick={() => setTypeOfRecipes('Following')}>
                    Following
                </button>
            </ul>
            <ul className={classes.recipes_container}>
                {typeOfRecipes === 'Trending' && <DisplayRecipes recipesToDisplay={listOfTrendingRecipes} />}
                {typeOfRecipes === 'Following' && <DisplayRecipes recipesToDisplay={listOfFollowedRecipes} />}
            </ul>
        </div>
    );
};

export async function getStaticProps() {
    await store.dispatch(loadTrendingRecipesAction());
    const { listOfTrendingRecipes } = store.getState().recipeReducer;

    return { props: { listOfTrendingRecipes }, revalidate: 10 };
}

export default HomePage;
