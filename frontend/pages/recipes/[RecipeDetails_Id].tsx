// check difference between props.match.params.id && props.id

import React, { useEffect, useState } from 'react';

import Custom404 from '../404';
import DisplayReviews from '../../components/reviews/DisplayReviews';
import Head from 'next/head';
import Image from 'next/image';
import IsRecipeAuthor from '../../components/recipes/IsRecipeAuthor';
import Link from 'next/link';
import ReviewCreate from '../../components/reviews/ReviewCreate';
import SaveUnSave from '../../components/recipes/SaveUnSave';
import { loadRecipeDetailsAction } from '../../redux/actions/recipeActions';
import { reviewsInRecipeAction } from '../../redux/actions/recipeActions';
import store from '../../redux/store';
import { useSelector } from 'react-redux';

const RecipeDetails = (props) => {
    const [recipeData, setRecipeData] = useState(props.serverRecipeData);
    const { requestedRecipeData, listOfFilteredReviews } = useSelector((state) => state.recipeReducer);
    const { isUserAuthenticated } = useSelector((state) => state.userReducer);
    const [reviewsData, setReviewsData] = useState(props.serverReviewsData);

    useEffect(
        // when updating recipe data (title, description etc..) migrate the changes to the userData
        function migrateRequestedRecipeData() {
            const isRecipeDataMatchReqId = requestedRecipeData?.id === recipeData?.id;
            isRecipeDataMatchReqId ? setRecipeData(requestedRecipeData) : null;
        },
        [requestedRecipeData, recipeData?.id]
    );

    useEffect(
        // when updating reviews data migrate the changes to the reviewsData
        function migrateListOfFilteredReviews() {
            const isReviewsMatchRecipe = listOfFilteredReviews?.[0]?.recipe === recipeData?.id;
            isReviewsMatchRecipe ? setReviewsData(listOfFilteredReviews) : null;
        },
        [listOfFilteredReviews, recipeData?.id]
    );

    const displayInteriorImages = () => {
        if (recipeData) {
            const images = [];

            images.push(
                <div key={1}>
                    <div>
                        {recipeData.photo_1 ? (
                            <div>
                                <Image src={recipeData.photo_1} alt='' height={100} width={100} />
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

    const authorLinks = <section>{recipeData ? <IsRecipeAuthor recipe={recipeData} /> : null}</section>;
    return (
        <React.Fragment>
            <Head>
                {recipeData ? <title>ZBite - recipes |{`${recipeData.title}`}</title> : <title>ZBite - recipes </title>}
                <meta name='description' content='recipes detail' />
            </Head>
            <main data-testid='recipeDetails'>
                <section>{authorLinks}</section>
                <section>
                    {recipeData ? (
                        <div>
                            <Link href={`/users/${recipeData.author}/`} passHref>
                                <div>
                                    recipe Author: <p>{recipeData.author}</p>
                                </div>
                            </Link>
                            <p>saves: {recipeData.saves?.length}</p>
                            <div>
                                recipe title: <h1>{recipeData.title}</h1>
                            </div>
                            <Link href='/'>Home</Link>
                            {recipeData.photo_main ? (
                                <Image src={recipeData.photo_main} alt='' height={100} width={100} />
                            ) : null}
                            <ul>
                                <li>
                                    <div>
                                        Flavor Type:<p>{recipeData.flavor_type}</p>
                                        recipe description: <p>{recipeData.description}</p>
                                        {displayInteriorImages()}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Custom404 />
                    )}
                </section>
                <h2>reviews</h2>
                <section>{isUserAuthenticated ? <ReviewCreate recipeId={recipeData.id} /> : null}</section>
                <section>{isUserAuthenticated ? <SaveUnSave recipeId={recipeData.id} /> : null}</section>
                <section>{reviewsData ? <DisplayReviews reviewsToDisplay={reviewsData} /> : null}</section>
            </main>
        </React.Fragment>
    );
};

export async function getServerSideProps(context) {
    const id = context.params.RecipeDetails_Id;
    await store.dispatch(loadRecipeDetailsAction({ id }));
    const serverRecipeData = store.getState().recipeReducer.requestedRecipeData;
    const isRequestedRecipeIdExist = serverRecipeData?.id === id;

    if (isRequestedRecipeIdExist) {
        await store.dispatch(reviewsInRecipeAction({ recipeId: id }));
        const serverReviewsData = store.getState().recipeReducer.listOfFilteredReviews;
        return { props: { serverRecipeData, serverReviewsData } };
    } else {
        return { notFound: true };
    }
}

export default RecipeDetails;
