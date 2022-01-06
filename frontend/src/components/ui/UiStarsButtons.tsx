import React, { useState } from 'react';

import Image from 'next/image';
import StarIcon from '../../assets/icons/star.svg';
import imageLoader from '../../utils/imageLoader';
import styles from '../../styles/ui/UiStarsButtons.module.scss';
import { toast } from 'react-toastify';

const UiStarsButtons: React.FC = ({ setStarsValue, starsValue }) => {
    const createStarsArray = () => {
        const starsArray = [];
        for (let index = 1; index <= 5; index++) {
            let starButton = (
                <button
                    data-testid={`button number${index}`}
                    type='button'
                    key={index}
                    value={index}
                    name='stars'
                    className={`${starsValue >= index || styles.grayStar}`}
                    onClick={() => setStarsValue(index)}
                >
                    {StarIcon.src && (
                        <Image
                            loader={() => imageLoader({ src: StarIcon.src, width: 100, quality: 100 })}
                            src={StarIcon.src}
                            alt='star icon'
                            height={100}
                            width={100}
                        />
                    )}
                </button>
            );
            starsArray.push(starButton);
        }
        return starsArray;
    };

    const renderButtonStars = () =>
        createStarsArray().map((button) => {
            return button;
        });

    return (
        <section className={styles.rating}>
            <div className={styles.rating_icons}>{renderButtonStars()}</div>
        </section>
    );
};

export default UiStarsButtons;
