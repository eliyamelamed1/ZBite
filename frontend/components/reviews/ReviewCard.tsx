import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { pageRoute } from '../../globals';

const ReviewCard = ({ author, recipe, stars, comment, image }) => {
    const reviewProps = (
        <div>
            <Link href={pageRoute(author).profile} passHref>
                {author}
            </Link>
            <p>{recipe}</p>
            <p>{stars}</p>
            {comment ? <p>{comment}</p> : null}
            {image ? <Image src={image} alt='Review Image' height={100} width={100} /> : null}
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
    recipe: PropTypes.string.isRequired,
    stars: PropTypes.string.isRequired,
    comment: PropTypes.string,
    image: PropTypes.string,
};

export default ReviewCard;
