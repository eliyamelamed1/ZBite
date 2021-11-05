// NEW TODO - test saves

import Image from 'next/image';
import Link from 'next/link';
import ProfileIcon from '../../styles/icons/profile._pic.svg';
import PropTypes from 'prop-types';
import React from 'react';
import SavedIcon from '../../styles/icons/saved.svg';
import StarIcon from '../../styles/icons/star.svg';
import styles from '../../styles/components/_recipeCard.module.scss';

const RecipeCard = (props) => {
    const nextLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}?q=${quality || 100}`;
    };
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
                            <p>{props.author}</p>
                            {/* <p>eliya melamed</p> */}
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
                            <span>{props.stars}</span>
                        </div>
                    </li>
                </ul>
                <ul className={styles.saves_count_and_icon}>
                    <li className={styles.saves_count}>
                        <span>{props.saves}</span>
                    </li>
                    <li className={styles.saves_icon}>
                        <i>
                            {SavedIcon.src && <Image src={SavedIcon.src} alt='saved icon' height={100} width={100} />}
                        </i>
                    </li>
                </ul>
            </section>
            <section className={styles.detail_container_2}>
                <h3>{props.title}</h3>
            </section>
            <section className={styles.detail_container_3}>
                <li>
                    <Link href={`/recipes/${props.id}/`}>
                        <a>
                            <i>
                                {props.photo_main && (
                                    <Image
                                        loader={nextLoader}
                                        src={props.photo_main}
                                        alt='Recipe Image'
                                        height={100}
                                        width={100}
                                    />
                                )}
                            </i>
                        </a>
                    </Link>
                </li>
            </section>
        </div>
    );
};

RecipeCard.propTypes = {
    title: PropTypes.string.isRequired,
    photo_main: PropTypes.string,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    saves: PropTypes.number.isRequired,
    stars: PropTypes.any,
};

export default RecipeCard;
