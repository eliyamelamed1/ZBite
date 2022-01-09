// TODO - change PropTypes id to .isRequired

import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import UiButton from '../ui/UiButton';
import UiOptionsButton from '../ui/optionsForm/UiOptionsButton';
import deleteIcon from '../../assets/icons/delete-input-icon.svg';
import { pageRoute } from '../../enums';
import { recipeDeleteAction } from '../../redux/actions/recipeActions';
import { useDispatch } from 'react-redux';

// import editInput from '../../assets/icons/edit_input.svg';

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
                <UiOptionsButton>Delete Recipe</UiOptionsButton>
            </form>
        </div>
    );
};

RecipeDelete.propTypes = {
    id: PropTypes.string,
};

export default RecipeDelete;
