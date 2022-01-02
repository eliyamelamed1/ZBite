// TODO - change PropTypes id to .isRequired

import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import UiButton from '../ui/UiButton';
import { pageRoute } from '../../enums';
import { recipeDeleteAction } from '../../redux/actions/recipeActions';
import { useDispatch } from 'react-redux';

const RecipeDelete: React.FC<{ id: string }> = ({ id }) => {
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(recipeDeleteAction({ id }));
        } catch {
            // TODO - add err msg
        }
    };

    return (
        <div data-testid='recipeDelete'>
            <form onSubmit={onSubmit}>
                <UiButton reverse={false}>delete Recipe</UiButton>
            </form>
        </div>
    );
};

RecipeDelete.propTypes = {
    id: PropTypes.string,
};

export default RecipeDelete;
