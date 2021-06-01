// TOOD - change Author proptype to requiered after changing the api to delete recipe which their user have been deleterd - (which leaves recipes without users)

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const recipeCard = (props) => (
    <div data-testid='recipeCard'>
        <h3>Title: {props.title}</h3>
        {props.photo_main ? <img src={props.photo_main} alt='Recipe Image' /> : null}
        <Link to={`/users/${props.author}/`}>Author: {props.author}</Link>
        <p>Flavor: {props.flavor_type}</p>
        <Link to={`/recipes/${props.id}/`}>View Recipe Details</Link>
    </div>
);

recipeCard.propTypes = {
    title: PropTypes.string.isRequired,
    photo_main: PropTypes.string,
    flavor_type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string,
};

export default recipeCard;
