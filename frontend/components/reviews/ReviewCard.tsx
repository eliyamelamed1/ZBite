import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { pageRoute } from '../../globals';

const ReviewCard = (props) => {
    const reviewProps = (
        <div>
            <Link href={pageRoute(props.author).profile} passHref>
                {props.author}
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
            </main>
        </React.Fragment>
    );
};

ReviewCard.propTypes = {
    author: PropTypes.string.isRequired,
    stars: PropTypes.string.isRequired,
    comment: PropTypes.string,
    image: PropTypes.string,
};

export default ReviewCard;
