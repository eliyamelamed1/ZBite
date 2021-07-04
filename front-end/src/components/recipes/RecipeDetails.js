// check difference between props.match.params.id && props.id

import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import IsRecipeAuthor from './IsRecipeAuthor';
import { Link } from 'react-router-dom';
import { loadRecipeDetailsAction } from '../../redux/actions/recipe';

// import PropTypes from 'prop-types';

const recipeDetails = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadRecipeDetailsAction(props.match.params.id));
    }, [props.match.params.id, dispatch]);
    const recipeDetailData = useSelector((state) => state.recipeReducer.recipeDetailData);

    const displayInteriorImages = () => {
        if (recipeDetailData) {
            const images = [];

            images.push(
                <div key={1}>
                    <div>
                        {recipeDetailData.photo_1 ? (
                            <div>
                                <img src={recipeDetailData.photo_1} alt='' />
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
            {recipeDetailData ? (
                <div>
                    <Link to={`/users/${recipeDetailData.author}/`}>recipe Author: {recipeDetailData.author}</Link>
                    <h1>recipe title: {recipeDetailData.title}</h1>
                    <Link to='/'>Home</Link> /{recipeDetailData.title}
                    <img src={recipeDetailData.photo_main} alt='' />
                    <ul>
                        <li>
                            Flavor Type:
                            {recipeDetailData.flavor_type}
                        </li>
                    </ul>
                    <p>recipe description: {recipeDetailData.description}</p>
                    {displayInteriorImages()}
                </div>
            ) : null}
        </div>
    );

    const authorLinks = <section>{recipeDetailData ? <IsRecipeAuthor recipe={recipeDetailData} /> : null}</section>;

    return (
        <div data-testid='recipeDetails'>
            <HelmetProvider>
                <Helmet>
                    {recipeDetailData ? (
                        <title>ZBite - recipes |{`${recipeDetailData.title}`}</title>
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

export default connect()(recipeDetails);
