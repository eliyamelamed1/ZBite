import IsReviewAuthor from './isReviewAuthor';
import Link from 'next/link';
import React from 'react';
import UiCircleImage from '../ui/UiCircleImage';
import UiStars from '../ui/UiStars';
import emptyImageIcon from '../../assets/icons/upload_image.svg';
import { pageRoute } from '../../enums';
import styles from '../../styles/components/reviewCard.module.scss';

interface Review {
    id: string;
    author: { name: string; id: string; photo_main: { src: string } | null };
    comment: string;
    image: File | null;
    stars: string;
    recipe: string;
    created_at: string;
}

const ReviewCard = (props: Review) => {
    const { author, comment, stars, created_at } = props;
    let newDate = new Date(created_at);
    const formattedDate = Intl.DateTimeFormat('fr-FR').format(newDate);

    const reviewProps = (
        <>
            <section className={styles.review_card}>
                <div className={styles.image_container}>
                    {author.photo_main?.src ? (
                        <UiCircleImage src={author.photo_main?.src} />
                    ) : (
                        emptyImageIcon.src && <UiCircleImage src={emptyImageIcon.src} />
                    )}
                </div>
                <div className={styles.author_and_stars_container}>
                    <div className={styles.author_container}>
                        <Link href={pageRoute(author.id).profile} passHref>
                            {author.name}
                        </Link>
                    </div>
                    <div className={styles.stars_container}>
                        <UiStars starsCount={stars} />
                    </div>
                </div>
                <div className={styles.created_at}>
                    <IsReviewAuthor review={props} />
                    {formattedDate}
                </div>
                <div className={styles.comment_container}>{comment}</div>
            </section>
            <br />
        </>
    );
    return (
        <React.Fragment>
            <main data-testid='reviewCard'>
                <section>{reviewProps}</section>
                <br />
            </main>
        </React.Fragment>
    );
};

export default ReviewCard;
