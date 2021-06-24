// TODO - change PropTypes id to .isRequired
// test form call onSubmit
// test onSubmit dispatch action
// test propTypes

import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { recipeDeleteAction } from '../../redux/actions/recipe';

const recipeDelete = ({ id }) => {
    const dispatch = useDispatch();
    const [onSubmitHaveBeenCalled, setOnSubmitHaveBeenCalled] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setOnSubmitHaveBeenCalled(true);

        dispatch(recipeDeleteAction(id));
    };
    const testing = (
        <main>
            <div>{onSubmitHaveBeenCalled ? <div data-testid='onSubmitHaveBeenCalled'></div> : null}</div>
        </main>
    );
    return (
        <div data-testid='recipeDelete'>
            <form onSubmit={(e) => onSubmit(e)}>
                <button type='submit'>delete Recipe</button>
            </form>
            <div>{testing}</div>
        </div>
    );
};

recipeDelete.propTypes = {
    id: PropTypes.string,
};

export default connect()(recipeDelete);
