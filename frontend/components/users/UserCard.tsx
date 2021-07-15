/*tests
test proptyoes
test use card details


*/

import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const userCard = (props) => (
    <div data-testid='userCard'>
        <h3>name: {props.name}</h3>
        <h3>email: {props.email}</h3>
        {props.photo_main ? <Image src={props.photo_main} alt='userImage' width={100} height={100} /> : null}
        <Link href={`/users/${props.id}/`}>View user profile</Link>
    </div>
);

userCard.propTypes = {
    name: PropTypes.string.isRequired,
    photo_main: PropTypes.string,
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default userCard;
