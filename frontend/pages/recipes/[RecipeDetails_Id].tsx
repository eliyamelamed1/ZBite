// check difference between props.match.params.id && props.id

import Custom404 from '../404';
import Head from 'next/head';
import Image from 'next/image';
import IsRecipeAuthor from '../../components/recipes/IsRecipeAuthor';
import Link from 'next/link';
import React from 'react';
import { loadRecipeDetailsAction } from '../../redux/actions/recipe';
import store from '../../redux/store';

const RecipeDetails = (props) => {
    const searchedRecipeData = props.searchedRecipeData;
    const displayInteriorImages = () => {
        if (searchedRecipeData) {
            const images = [];

            images.push(
                <div key={1}>
                    <div>
                        {searchedRecipeData.photo_1 ? (
                            <div>
                                <Image src={searchedRecipeData.photo_1} alt='' height={100} width={100} />
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

    const authorLinks = <section>{searchedRecipeData ? <IsRecipeAuthor recipe={searchedRecipeData} /> : null}</section>;

    return (
        <React.Fragment>
            <Head>
                {searchedRecipeData ? (
                    <title>ZBite - recipes |{`${searchedRecipeData.title}`}</title>
                ) : (
                    <title>ZBite - recipes </title>
                )}
                <meta name='description' content='recipes detail' />
            </Head>
            <main data-testid='recipeDetails'>
                <section>{authorLinks}</section>
                <section>
                    {searchedRecipeData ? (
                        <div>
                            <Link href={`/users/${searchedRecipeData.author}/`} passHref>
                                <p>recipe Author: {searchedRecipeData.author}</p>
                            </Link>
                            <h1>recipe title: {searchedRecipeData.title}</h1>
                            <Link href='/'>Home</Link>
                            {searchedRecipeData.photo_main ? (
                                <Image src={searchedRecipeData.photo_main} alt='' height={100} width={100} />
                            ) : null}
                            <ul>
                                <li>
                                    Flavor Type:
                                    {searchedRecipeData.flavor_type}
                                </li>
                            </ul>
                            <p>recipe description: {searchedRecipeData.description}</p>
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
    const searchedRecipeData = store.getState().recipeReducer.searchedRecipeData;

    const isRecipeDataIdMatchSearchedId = searchedRecipeData?.id === id;

    if (isRecipeDataIdMatchSearchedId) {
        return { props: { searchedRecipeData } };
    } else {
        return { notFound: true };
    }
}

export default RecipeDetails;
