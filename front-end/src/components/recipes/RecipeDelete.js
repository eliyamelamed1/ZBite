// TODO - change PropTypes id to .isRequired

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { recipeDeleteAction } from '../../redux/actions/recipe';

const recipeDelete = ({ id, recipeDeleteAction }) => {
    const [onSubmitHaveBeenCalled, setOnSubmitHaveBeenCalled] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setOnSubmitHaveBeenCalled(true);

        recipeDeleteAction(id);
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

export default connect(null, { recipeDeleteAction })(recipeDelete);
