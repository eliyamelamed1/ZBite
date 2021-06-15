// check difference between props.match.params.id && props.id

import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useEffect } from 'react';

import IsRecipeAuthor from '../components/recipes/IsRecipeAuthor';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRecipeDetailsAction } from '../redux/actions/recipe';

// import PropTypes from 'prop-types';

const recipeDetailPage = (props) => {
    useEffect(() => {
        props.loadRecipeDetailsAction(props.match.params.id);
    }, [props.match.params.id]);

    const displayInteriorImages = () => {
        if (props.recipeDetailState) {
            const images = [];

            images.push(
                <div key={1}>
                    <div>
                        {props.recipeDetailState.photo_1 ? (
                            <div>
                                <img src={props.recipeDetailState.photo_1} alt='' />
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
            {props.recipeDetailState ? (
                <div>
                    <Link to={`/users/${props.recipeDetailState.author}/`}>
                        recipe Author: {props.recipeDetailState.author}
                    </Link>
                    <h1>recipe title: {props.recipeDetailState.title}</h1>
                    <Link to='/'>Home</Link> /{props.recipeDetailState.title}
                    <img src={props.recipeDetailState.photo_main} alt='' />
                    <ul>
                        <li>
                            Flavor Type:
                            {props.recipeDetailState.flavor_type}
                        </li>
                    </ul>
                    <p>recipe description: {props.recipeDetailState.description}</p>
                    {displayInteriorImages()}
                </div>
            ) : null}
        </div>
    );

    const authorLinks = (
        <section>{props.recipeDetailState ? <IsRecipeAuthor recipe={props.recipeDetailState} /> : null}</section>
    );

    return (
        <div data-testid='recipeDetailPage'>
            <HelmetProvider>
                <Helmet>
                    {props.recipeDetailState ? (
                        <title>ZBite - recipes |{`${props.recipeDetailState.title}`}</title>
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
    recipeDetailState: state.recipeReducer.recipeDetailState,
});

export default connect(mapStateToProps, { loadRecipeDetailsAction })(recipeDetailPage);
