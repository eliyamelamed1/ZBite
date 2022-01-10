import Image from 'next/image';
import React from 'react';
import StarIcon from '../../assets/icons/star.svg';
import styles from '../../styles/ui/UiStars.module.scss';

const UiStars: React.FC<{ starsCount: string }> = ({ starsCount }) => {
    const grayStar = (key) => (
        <i key={key} className={styles.grayStar}>
            {StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}
        </i>
    );

    const orangeStar = (key) => (
        <i key={key}>{StarIcon.src && <Image src={StarIcon.src} alt='star icon' height={100} width={100} />}</i>
    );

    const mixedStars = () => {
        const mixedStarsArray = [];
        const numOfOrangeStars = Math.round(+starsCount);
        const numOfGrayStars = 5 - numOfOrangeStars;

        for (let index = 0; index < numOfOrangeStars; index++) {
            let key = Math.random();

            mixedStarsArray.push(orangeStar(key));
        }

        for (let index = 0; index < numOfGrayStars; index++) {
            let key = Math.random();

            mixedStarsArray.push(grayStar(key));
        }

        return mixedStarsArray;
    };

    if (!starsCount) starsCount = '0.0';

    return (
        <section className={styles.rating}>
            <div className={styles.rating_icons}>{mixedStars()}</div>
            <div className={styles.rating_score}>
                <span>({parseFloat(starsCount).toFixed(1)})</span>
            </div>
        </section>
    );
};

export default UiStars;
