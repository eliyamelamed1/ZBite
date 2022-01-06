// NEW TODO - test saves

import Image from 'next/image';
import Link from 'next/link';
import ProfileIcon from '../../assets/icons/profile._pic.svg';
import PropTypes from 'prop-types';
import React from 'react';
import UiSaves from '../ui/UiSaves';
import UiStars from '../ui/UiStars';
import imageLoader from '../../utils/imageLoader';
import styles from '../../styles/components/_recipeCard.module.scss';
import uploadImageIcon from '../../assets/icons/upload_image.svg';

interface DataTypes {
    title: string;
    photo_main: string;
    id: string;
    author: { name: string; id: string };
    saves: string[];
    stars: string;
}

const RecipeCard: React.FC<DataTypes> = ({ title, photo_main, id, author, saves, stars }) => {
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
                        <Link href={`/users/${author?.id}/`} passHref>
                            <span className={styles.author_name}>{author?.name}</span>
                        </Link>
                    </li>
                    <UiStars starsCount={stars} />
                </ul>
                <UiSaves savesCount={saves.length} />
            </section>
            <section className={styles.detail_container_2}>
                <h3>{title}</h3>
            </section>
            <section className={styles.detail_container_3}>
                <li>
                    <Link href={`/recipes/${id}/`}>
                        <a>
                            <i>
                                {photo_main ? (
                                    <Image
                                        loader={imageLoader}
                                        src={photo_main}
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

export default RecipeCard;
