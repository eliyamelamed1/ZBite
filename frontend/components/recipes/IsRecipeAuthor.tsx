// test propTypes
// test authorLinks, guestLinks
// test useEffect
// test logic

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import RecipeDelete from './RecipeDelete';
import RecipeUpdate from './RecipeUpdate';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface Recipe {
    id: string;
    author: { id: string; [key: string]: any };
    cook_time: string;
    description: string;
    title: string;
    serving: string;
    stars: string;
    photo_main: string;
    saves: string[];
    ingredients_text_list: string[];
    instructions_text_list: string[];
    instructions_image_list: File[];
    [key: string]: any;
}

const IsRecipeAuthor: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
    const [isAuthor, setIsAuthor] = useState<boolean>(false);
    const { loggedUserData } = useSelector((state: RootState) => state.userReducer);

    const guestLinks = <div data-testid='guestLinks'>you are not the recipe author </div>;

    const authorLinks = (
        <div data-testid='authorLinks'>
            <RecipeDelete id={recipe.id} />
            <RecipeUpdate id={recipe.id} />
        </div>
    );

    useEffect(() => {
        if (loggedUserData != null) {
            if (recipe?.author?.id == loggedUserData.id) {
                setIsAuthor(true);
            }
        }
    }, [loggedUserData, recipe.author.id]);
    return <div data-testid='isRecipeAuthor'>{isAuthor ? authorLinks : guestLinks}</div>;
};

export default IsRecipeAuthor;
