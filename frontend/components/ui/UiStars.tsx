import Image from 'next/image';
import React from 'react';
import StarIcon from '../../styles/icons/star.svg';
import styles from '../../styles/ui/UiStars.module.scss';

const UiStars: React.FC<{ starsCount: string }> = ({ starsCount }) => {
    if (!starsCount) starsCount = 'not rated';
    return (
        <section className={styles.rating}>
            <div className={styles.rating_icons}>
                <i>{StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}</i>
                <i>{StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}</i>
                <i>{StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}</i>
                <i>{StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}</i>
                <i>{StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}</i>
            </div>
            <div className={styles.rating_score}>
                <span>{starsCount}</span>
            </div>
        </section>
    );
};

export default UiStars;
