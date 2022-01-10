import Image from 'next/image';
import React from 'react';
import StarIcon from '../../assets/icons/star.svg';
import imageLoader from '../../utils/imageLoader';
import styles from '../../styles/ui/UiStarsButtons.module.scss';

const UiStarsButtons = ({ setStarsValue, starsValue }) => {
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
                        <Image loader={imageLoader} src={StarIcon.src} alt='star icon' height={100} width={100} />
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
