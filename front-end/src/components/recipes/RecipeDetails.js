// check difference between props.match.params.id && props.id

import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useEffect } from 'react';

import IsRecipeAuthor from './IsRecipeAuthor';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRecipeDetailsAction } from '../../redux/actions/recipe';

// import PropTypes from 'prop-types';

const recipeDetailPage = (props) => {
    useEffect(() => {
        props.loadRecipeDetailsAction(props.match.params.id);
    }, [props.match.params.id]);

    const displayInteriorImages = () => {
        if (props.recipeDetailData) {
            const images = [];

            images.push(
                <div key={1}>
                    <div>
                        {props.recipeDetailData.photo_1 ? (
                            <div>
                                <img src={props.recipeDetailData.photo_1} alt='' />
                            </div>
                        ) : (
                            <div>* this recipe has no photos *</div>
                        )}
                    </div>
                </div>
            );
            return images;
        }
    };

    const guestLinks = (
        <div>
            {props.recipeDetailData ? (
                <div>
                    <Link to={`/users/${props.recipeDetailData.author}/`}>
                        recipe Author: {props.recipeDetailData.author}
                    </Link>
                    <h1>recipe title: {props.recipeDetailData.title}</h1>
                    <Link to='/'>Home</Link> /{props.recipeDetailData.title}
                    <img src={props.recipeDetailData.photo_main} alt='' />
                    <ul>
                        <li>
                            Flavor Type:
                            {props.recipeDetailData.flavor_type}
                        </li>
                    </ul>
                    <p>recipe description: {props.recipeDetailData.description}</p>
                    {displayInteriorImages()}
                </div>
            ) : null}
        </div>
    );

    const authorLinks = (
        <section>{props.recipeDetailData ? <IsRecipeAuthor recipe={props.recipeDetailData} /> : null}</section>
    );

    return (
        <div data-testid='recipeDetails'>
            <HelmetProvider>
                <Helmet>
                    {props.recipeDetailData ? (
                        <title>ZBite - recipes |{`${props.recipeDetailData.title}`}</title>
                    ) : (
                        <title>ZBite - recipes </title>
                    )}
                    <meta name='description' content='recipes detail' />
                </Helmet>
            </HelmetProvider>
            <div>{authorLinks}</div>
            <div>{guestLinks}</div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    recipeDetailData: state.recipeReducer.recipeDetailData,
});

export default connect(mapStateToProps, { loadRecipeDetailsAction })(recipeDetailPage);
