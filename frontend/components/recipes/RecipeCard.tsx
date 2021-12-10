// NEW TODO - test saves

import Image from 'next/image';
import Link from 'next/link';
import ProfileIcon from '../../styles/icons/profile._pic.svg';
import PropTypes from 'prop-types';
import React from 'react';
import UiSaves from '../ui/UiSaves';
import UiStars from '../ui/UiStars';
import imageLoader from '../utils/imageLoader';
import styles from '../../styles/components/_recipeCard.module.scss';
import uploadImageIcon from '../../styles/icons/upload_image.svg';

const RecipeCard = (props) => {
    return (
        <div data-testid='recipeCard' className={styles.card_container}>
            <section className={styles.detail_container_1}>
                <i className={styles.profile_pic}>
                    {ProfileIcon.src && (
                        <Image src={ProfileIcon.src} alt='author profile photo' height={100} width={100} />
                    )}
                </i>
                <ul className={styles.author_and_rating_container}>
                    <li>
                        <Link href={`/users/${props?.author?.id}/`} passHref>
                            <p>{props?.author?.name}</p>
                        </Link>
                    </li>
                    <UiStars starsCount={props.stars} />
                </ul>
                <UiSaves savesCount={props.saves} />
            </section>
            <section className={styles.detail_container_2}>
                <h3>{props.title}</h3>
            </section>
            <section className={styles.detail_container_3}>
                <li>
                    <Link href={`/recipes/${props.id}/`}>
                        <a>
                            <i>
                                {props.photo_main ? (
                                    <Image
                                        loader={imageLoader}
                                        src={props.photo_main}
                                        alt='Recipe Image'
                                        height={100}
                                        width={100}
                                    />
                                ) : (
                                    <Image
                                        loader={imageLoader}
                                        src={uploadImageIcon.src}
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
    author: PropTypes.object.isRequired,
    saves: PropTypes.number.isRequired,
    stars: PropTypes.any,
};

export default RecipeCard;
