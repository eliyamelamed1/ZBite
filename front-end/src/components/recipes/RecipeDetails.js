// check difference between props.match.params.id && props.id

import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import IsRecipeAuthor from './IsRecipeAuthor';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import { loadRecipeDetailsAction } from '../../redux/actions/recipe';

// import PropTypes from 'prop-types';

const recipeDetails = (props) => {
    const dispatch = useDispatch();
    const { id } = props.match.params;

    useEffect(() => {
        try {
            dispatch(loadRecipeDetailsAction({ id }));
        } catch {
            // TODO - add err msg
        }
    }, [id, dispatch]);
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

    const authorLinks = <section>{recipeDetailData ? <IsRecipeAuthor recipe={recipeDetailData} /> : null}</section>;

    return (
        <div>
            <header data-testid='recipeDetails'>
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
            </header>
            <main>
                <section>{authorLinks}</section>
                <section>
                    {recipeDetailData ? (
                        <div>
                            <Link to={`/users/${recipeDetailData.author}/`}>
                                recipe Author: {recipeDetailData.author}
                            </Link>
                            <h1>recipe title: {recipeDetailData.title}</h1>
                            <Link to='/'>Home</Link>
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
                    ) : (
                        <NotFound />
                    )}
                </section>
            </main>
        </div>
    );
};

export default connect()(recipeDetails);
