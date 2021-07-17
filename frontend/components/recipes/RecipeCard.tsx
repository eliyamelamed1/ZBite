import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const RecipeCard = (props) => (
    <React.Fragment>
        <div data-testid='recipeCard'>
            <h3>Title: {props.title}</h3>
            {props.photo_main ? <Image src={props.photo_main} alt='Recipe Image' height={100} width={100} /> : null}
            <Link href={`/users/${props.author}/`} passHref>
                <p>Author: {props.author}</p>
            </Link>
            <p>Flavor: {props.flavor_type}</p>
            <Link href={`/recipes/${props.id}/`}>View Recipe Details</Link>
        </div>
    </React.Fragment>
);

RecipeCard.propTypes = {
    title: PropTypes.string.isRequired,
    photo_main: PropTypes.string,
    flavor_type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

export default RecipeCard;
