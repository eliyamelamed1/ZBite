import Image from 'next/image';
import IsReviewAuthor from './isReviewAuthor';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import UiStars from '../ui/UiStars';
import { pageRoute } from '../../enums';
import styles from '../../styles/components/reviewCard.module.scss';

interface Review {
    id: string;
    author: { name: string; id: string; photo_main: File | null };
    comment: string;
    image: File | null;
    stars: number;
    recipe: string;
}

const ReviewCard = (props: Review) => {
    const { author, comment, image, stars, id } = props;

    const reviewProps = (
        <div className={styles.review_card}>
            {/* <p>{photo_main}</p> */}
            <div>
                <Link href={pageRoute(props?.author?.id).profile} passHref>
                    {author?.name}
                </Link>
            </div>
            <p>
                <UiStars starsCount={stars} />
            </p>
            {comment ? <p>{props.comment}</p> : null}
        </div>
    );
    return (
        <React.Fragment>
            <main data-testid='reviewCard'>
                <section>{reviewProps}</section>
                <IsReviewAuthor review={props} />
            </main>
        </React.Fragment>
    );
};

export default ReviewCard;
