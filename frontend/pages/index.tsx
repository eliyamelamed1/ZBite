import React, { useRef } from 'react';

import DisplayRecipes from '../components/recipes/DisplayRecipes';
import classes from '../styles/pages/home.module.scss';
import { loadRecipeListAction } from '../redux/actions/recipeActions';
import store from '../redux/store';

const HomePage = (props) => {
    const buttonsRef = useRef() as any;
    const onClick = (e) => {
        if (e.target.name === 'subscribed') {
            buttonsRef.current.children[0].className = classes.active;
            buttonsRef.current.children[1].className = '';
        }
        if (e.target.name === 'for you') {
            buttonsRef.current.children[0].className = '';
            buttonsRef.current.children[1].className = classes.active;
        }
    };

    const listOfRecipes = props.listOfRecipes;
    return (
        <div className={classes.container}>
            <ul className={classes.recipe_filter} ref={buttonsRef} onClick={onClick}>
                <button className={classes.active} name='subscribed'>
                    Subscribed
                </button>
                <button name='for you'>For You</button>
            </ul>
            <ul className={classes.recipes_container}>
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
                {listOfRecipes && <DisplayRecipes recipesToDisplay={listOfRecipes} />}
            </ul>
        </div>
    );
};

export async function getStaticProps() {
    await store.dispatch(loadRecipeListAction());
    const { listOfRecipes } = store.getState().recipeReducer;

    return { props: { listOfRecipes }, revalidate: 10 };
}

export default HomePage;
