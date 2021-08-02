// check difference between props.match.params.id && props.id

import Custom404 from '../404';
import Head from 'next/head';
import Image from 'next/image';
import IsRecipeAuthor from '../../components/recipes/IsRecipeAuthor';
import Link from 'next/link';
import React from 'react';
import { loadRecipeDetailsAction } from '../../redux/actions/recipeActions';
import store from '../../redux/store';

const RecipeDetails = (props) => {
    const requestedRecipeData = props.requestedRecipeData;
    const displayInteriorImages = () => {
        if (requestedRecipeData) {
            const images = [];

            images.push(
                <div key={1}>
                    <div>
                        {requestedRecipeData.photo_1 ? (
                            <div>
                                <Image src={requestedRecipeData.photo_1} alt='' height={100} width={100} />
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

    const authorLinks = (
        <section>{requestedRecipeData ? <IsRecipeAuthor recipe={requestedRecipeData} /> : null}</section>
    );

    return (
        <React.Fragment>
            <Head>
                {requestedRecipeData ? (
                    <title>ZBite - recipes |{`${requestedRecipeData.title}`}</title>
                ) : (
                    <title>ZBite - recipes </title>
                )}
                <meta name='description' content='recipes detail' />
            </Head>
            <main data-testid='recipeDetails'>
                <section>{authorLinks}</section>
                <section>
                    {requestedRecipeData ? (
                        <div>
                            <Link href={`/users/${requestedRecipeData.author}/`} passHref>
                                <p>recipe Author: {requestedRecipeData.author}</p>
                            </Link>
                            <h1>recipe title: {requestedRecipeData.title}</h1>
                            <Link href='/'>Home</Link>
                            {requestedRecipeData.photo_main ? (
                                <Image src={requestedRecipeData.photo_main} alt='' height={100} width={100} />
                            ) : null}
                            <ul>
                                <li>
                                    Flavor Type:
                                    {requestedRecipeData.flavor_type}
                                </li>
                            </ul>
                            <p>recipe description: {requestedRecipeData.description}</p>
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

export async function getServerSideProps(context) {
    const id = context.params.RecipeDetails_Id;
    await store.dispatch(loadRecipeDetailsAction({ id }));
    const requestedRecipeData = store.getState().recipeReducer.requestedRecipeData;

    const isRequestedRecipeIdExist = requestedRecipeData?.id === id;

    if (isRequestedRecipeIdExist) {
        return { props: { requestedRecipeData } };
    } else {
        return { notFound: true };
    }
}

export default RecipeDetails;
