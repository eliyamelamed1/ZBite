// NEW TODO - test saves

import Image from 'next/image';
import Link from 'next/link';
import PizzaPhoto from '../../styles/icons/pizza.svg';
import ProfileIcon from '../../styles/icons/profile._pic.svg';
import PropTypes from 'prop-types';
import React from 'react';
import SavedIcon from '../../styles/icons/saved.svg';
import StarIcon from '../../styles/icons/star.svg';
import styles from '../../styles/components/_recipeCard.module.scss';

const RecipeCard = (props) => {
    return (
        <div data-testid='recipeCard' className={styles.card_container}>
            <section className={styles.detail_container_1}>
                <i className={styles.profile_pic}>
                    {ProfileIcon.src && (
                        <Image src={ProfileIcon.src} alt='author profile photo' height={100} width={100} />
                    )}
                </i>
                <ul className={styles.author_and_rating}>
                    <li>
                        <Link href={`/users/${props.author}/`} passHref>
                            {/* <p>Author: {props.author}</p> */}
                            <p>eliya melamed</p>
                        </Link>
                    </li>
                    <li className={styles.rating}>
                        <div className={styles.rating_icons}>
                            <i>
                                {StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}
                            </i>
                            <i>
                                {StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}
                            </i>
                            <i>
                                {StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}
                            </i>
                            <i>
                                {StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}
                            </i>
                            <i>
                                {StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}
                            </i>
                        </div>
                        <div className={styles.rating_score}>
                            <span>(5.0)</span>
                        </div>
                    </li>
                </ul>
                <ul className={styles.saves_count_and_icon}>
                    <li className={styles.saves_count}>
                        <span>54</span>
                    </li>
                    <li className={styles.saves_icon}>
                        <i>
                            {SavedIcon.src && <Image src={SavedIcon.src} alt='saved icon' height={100} width={100} />}
                        </i>
                    </li>
                </ul>
            </section>
            <section className={styles.detail_container_2}>
                {/* <h3>Title: {props.title}</h3> */}
                <h3>The best pizza ever made in the whole usa</h3>
            </section>
            <section className={styles.detail_container_3}>
                <li>
                    <Link href={`/recipes/${props.id}/`}>
                        <a>
                            <i>
                                {PizzaPhoto.src && (
                                    <Image src={PizzaPhoto.src} alt='Recipe Image' height={100} width={100} />
                                )}
                            </i>
                        </a>
                    </Link>
                </li>
            </section>
        </div>
    );
};
{
    /* {props.photo_main && <Image src={props.photo_main} alt='Recipe Image' height={100} width={100} />} */
}

RecipeCard.propTypes = {
    title: PropTypes.string.isRequired,
    photo_main: PropTypes.string,
    flavor_type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    saves: PropTypes.any,
};

export default RecipeCard;
