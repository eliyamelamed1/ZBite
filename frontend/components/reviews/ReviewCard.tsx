import Image from 'next/image';
import IsReviewAuthor from './isReviewAuthor';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { pageRoute } from '../../enums';

const ReviewCard = (props) => {
    const reviewProps = (
        <div>
            <Link href={pageRoute(props?.author?.id).profile} passHref>
                {props?.author?.name}
            </Link>
            <p>{props.stars}</p>
            {props.comment ? <p>{props.comment}</p> : null}
            {props.image ? <Image src={props.image} alt='Review Image' height={100} width={100} /> : null}
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

ReviewCard.propTypes = {
    author: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    stars: PropTypes.string.isRequired,
    comment: PropTypes.string,
    image: PropTypes.string,
};

export default ReviewCard;
