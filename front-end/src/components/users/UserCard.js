/*tests
test proptyoes
test use card details


*/ 

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const userCard = (props) => (
    <div data-testid='userCard'>
        <h3>name: {props.name}</h3>
        <h3>email: {props.email}</h3>
        {props.photo_main ? <img src={props.photo_main} alt='user Image' /> : null}
        <Link to={`/users/${props.id}/`}>View user profile</Link>
    </div>
);

userCard.propTypes = {
    name: PropTypes.string.isRequired,
    photo_main: PropTypes.string,
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default userCard;
