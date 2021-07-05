// TODO - test proptypes
// test card details

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

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
    author: PropTypes.string.isRequired,
};

export default recipeCard;
