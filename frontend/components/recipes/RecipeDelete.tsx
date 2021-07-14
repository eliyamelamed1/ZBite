// TODO - change PropTypes id to .isRequired
// TODO test propTypes

import { connect, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import React from 'react';
import { recipeDeleteAction } from '../../redux/actions/recipe';

const recipeDelete = ({ id }) => {
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
            <form onSubmit={(e) => onSubmit(e)}>
                <button type='submit'>delete Recipe</button>
            </form>
        </div>
    );
};

recipeDelete.propTypes = {
    id: PropTypes.string,
};

export default connect()(recipeDelete);
