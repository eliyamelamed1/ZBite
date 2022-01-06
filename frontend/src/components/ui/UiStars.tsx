import Image from 'next/image';
import React from 'react';
import StarIcon from '../../assets/icons/star.svg';
import styles from '../../styles/ui/UiStars.module.scss';

const UiStars: React.FC<{ starsCount: string }> = ({ starsCount }) => {
    // const totalStars = 5;
    // const grayStar = (
    //     <i className={styles.grayStar}>
    //         {StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}
    //     </i>
    // );

    // const orangeStar = <i>{StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}</i>;
    // console.log(Math.round(starsCount));

    // const mixedStars = () => {
    //     Math.round(starsCount)
    // };

    // if (!starsCount) starsCount = 0.0;

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
                <span>({parseFloat(starsCount).toFixed(1)})</span>
            </div>
        </section>
    );
};

export default UiStars;
