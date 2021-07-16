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

    const { recipeDetailData } = useSelector((state) => state.recipeReducer);

    const displayInteriorImages = () => {
        if (recipeDetailData) {
            const images = [];

            images.push(
                <div key={1}>
                    <div>
                        {recipeDetailData.photo_1 ? (
                            <div>
                                <Image src={recipeDetailData.photo_1} alt='' height={100} width={100} />
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
        <React.Fragment>
            <Head>
                {recipeDetailData ? (
                    <title>ZBite - recipes |{`${recipeDetailData.title}`}</title>
                ) : (
                    <title>ZBite - recipes </title>
                )}
                <meta name='description' content='recipes detail' />
            </Head>
            <main data-testid='recipeDetails'>
                <section>{authorLinks}</section>
                <section>
                    {recipeDetailData ? (
                        <div>
                            <Link href={`/users/${recipeDetailData.author}/`} passHref>
                                <p>recipe Author: {recipeDetailData.author}</p>
                            </Link>
                            <h1>recipe title: {recipeDetailData.title}</h1>
                            <Link href='/'>Home</Link>
                            {recipeDetailData.photo_main ? (
                                <Image src={recipeDetailData.photo_main} alt='' height={100} width={100} />
                            ) : null}
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
                        <Custom404 />
                    )}
                </section>
            </main>
        </React.Fragment>
    );
};

export default RecipeDetails;
