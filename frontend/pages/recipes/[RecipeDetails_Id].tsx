// check difference between props.match.params.id && props.id

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Custom404 from '../404';
import Head from 'next/head';
import Image from 'next/image';
import IsRecipeAuthor from '../../components/recipes/IsRecipeAuthor';
import Link from 'next/link';
import { loadRecipeDetailsAction } from '../../redux/actions/recipe';
import { useRouter } from 'next/router';

const RecipeDetails = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { RecipeDetails_Id } = router.query;
    const id = RecipeDetails_Id;

    useEffect(() => {
        try {
            dispatch(loadRecipeDetailsAction({ id }));
        } catch {
            // TODO - add err msg
        }
    }, [id, dispatch]);

    const { recipeDetails } = useSelector((state) => state.recipeReducer);

    const displayInteriorImages = () => {
        if (recipeDetails) {
            const images = [];

            images.push(
                <div key={1}>
                    <div>
                        {recipeDetails.photo_1 ? (
                            <div>
                                <Image src={recipeDetails.photo_1} alt='' height={100} width={100} />
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

    const authorLinks = <section>{recipeDetails ? <IsRecipeAuthor recipe={recipeDetails} /> : null}</section>;

    return (
        <React.Fragment>
            <Head>
                {recipeDetails ? (
                    <title>ZBite - recipes |{`${recipeDetails.title}`}</title>
                ) : (
                    <title>ZBite - recipes </title>
                )}
                <meta name='description' content='recipes detail' />
            </Head>
            <main data-testid='recipeDetails'>
                <section>{authorLinks}</section>
                <section>
                    {recipeDetails ? (
                        <div>
                            <Link href={`/users/${recipeDetails.author}/`} passHref>
                                <p>recipe Author: {recipeDetails.author}</p>
                            </Link>
                            <h1>recipe title: {recipeDetails.title}</h1>
                            <Link href='/'>Home</Link>
                            {recipeDetails.photo_main ? (
                                <Image src={recipeDetails.photo_main} alt='' height={100} width={100} />
                            ) : null}
                            <ul>
                                <li>
                                    Flavor Type:
                                    {recipeDetails.flavor_type}
                                </li>
                            </ul>
                            <p>recipe description: {recipeDetails.description}</p>
                            {displayInteriorImages()}
                        </div>
                    ) : (
                        <Custom404 />
                    )}
                </section>
            </main>
        </React.Fragment>
    );
};

export default RecipeDetails;
