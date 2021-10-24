// NEW TODO - test saves

import Image from 'next/image';
import Link from 'next/link';
import PizzaPhoto from '../../styles/icons/pizza.svg';
import PropTypes from 'prop-types';
import React from 'react';

const RecipeCard = (props) => {
    return (
        <div data-testid='recipeCard'>
            <ul>
                <li>
                    <h3>Title: {props.title}</h3>
                </li>
                <li>
                    <Link href={`/users/${props.author}/`} passHref>
                        <p>Author: {props.author}</p>
                    </Link>
                </li>
                <li>
                    <p>Flavor: {props.flavor_type}</p>
                </li>
                <li>
                    <Link href={`/recipes/${props.id}/`}>View Recipe Details</Link>
                </li>
            </ul>
            <ul>
                {props.photo_main && <Image src={props.photo_main} alt='Recipe Image' height={100} width={100} />}
                <li>
                    <i>
                        {PizzaPhoto.src && <Image src={PizzaPhoto.src} alt='Recipe Image' height={100} width={100} />}
                    </i>
                </li>
            </ul>
        </div>
    );
};

RecipeCard.propTypes = {
    title: PropTypes.string.isRequired,
    photo_main: PropTypes.string,
    flavor_type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    saves: PropTypes.any,
};

export default RecipeCard;
