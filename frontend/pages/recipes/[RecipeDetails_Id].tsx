// check difference between props.match.params.id && props.id

import React, { useEffect, useState } from 'react';
import store, { RootState } from '../../redux/store';

import Custom404 from '../404';
import DisplayReviews from '../../components/reviews/DisplayReviews';
import Head from 'next/head';
import Image from 'next/image';
import IsRecipeAuthor from '../../components/recipes/IsRecipeAuthor';
import Link from 'next/link';
import ReviewCreate from '../../components/reviews/ReviewCreate';
import SaveRecipe from '../../components/recipes/SaveRecipe';
import UiButton from '../../components/ui/UiButton';
import UiSaves from '../../components/ui/UiSaves';
import UiSectionSeparator from '../../components/ui/UiSectionSeperator';
import UiStars from '../../components/ui/UiStars';
import imageLoader from '../../components/utils/imageLoader';
import { loadRecipeDetailsAction } from '../../redux/actions/recipeActions';
import { reviewsInRecipeAction } from '../../redux/actions/recipeActions';
import styles from '../../styles/pages/recipeDetails.module.scss';
import uploadImageIcon from '../../styles/icons/upload_image.svg';
import { useSelector } from 'react-redux';

interface Recipe {
    id: string;
    author: { id: string; [key: string]: any };
    cook_time: string;
    description: string;
    title: string;
    serving: string;
    stars: string;
    photo_main: string;
    saves: string[];
    ingredients_text_list: string[];
    instructions_text_list: string[];
    instructions_image_list: File[];
    [key: string]: any;
}

const RecipeDetails = (props) => {
    const [recipeData, setRecipeData] = useState<Recipe>(props.serverRecipeData);
    const { requestedRecipeData, listOfFilteredReviews } = useSelector((state: RootState) => state.recipeReducer);
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

    const authorLinks = <section>{recipeData ? <IsRecipeAuthor recipe={recipeData} /> : null}</section>;
    return (
        <div className={styles.main}>
            <Head>
                {recipeData ? <title>ZBite | {`${recipeData.title}`}</title> : <title>ZBite - recipes </title>}
                <meta name='description' content='recipes detail' />
            </Head>
            <main data-testid='recipeDetails'>
                <section>
                    {recipeData ? (
                        <ul className={styles.recipe_data_container}>
                            <li className={styles.image_container}>
                                {recipeData.photo_main ? (
                                    <Image
                                        loader={imageLoader}
                                        src={recipeData.photo_main}
                                        alt=''
                                        height={100}
                                        width={100}
                                    />
                                ) : (
                                    uploadImageIcon.src && (
                                        <Image
                                            loader={imageLoader}
                                            src={uploadImageIcon.src}
                                            width={100}
                                            height={100}
                                            alt='recipe photo'
                                        />
                                    )
                                )}
                            </li>
                            <li className={styles.details_container}>
                                <i className={styles.profile_image_container}>asdd</i>
                                <Link href={`/users/${recipeData?.author?.id}/`} passHref>
                                    <h3 className={styles.author_name}>{recipeData?.author?.name}</h3>
                                </Link>

                                <div className={styles.saves_and_ratings_container}>
                                    <UiStars starsCount={recipeData.stars} />
                                    <UiSaves savesCount={recipeData.saves?.length} textToRight={true} />
                                </div>
                                <div className={styles.parent_buttons_container}>
                                    <section className={styles.buttons_container}>
                                        <SaveRecipe recipeId={recipeData.id} />
                                        <ReviewCreate recipeId={recipeData.id} />
                                    </section>
                                </div>
                            </li>
                            <UiSectionSeparator />
                            <p className={styles.title}> {recipeData?.title}</p>
                            <p className={styles.description}>{recipeData.description}</p>
                            <UiSectionSeparator />
                            <section></section>
                            <section className={styles.ingredients_container}>
                                <h1 className={styles.ingredients_section_title}>Ingredients</h1>
                                {recipeData?.ingredients_text_list?.map((ingredient, index) => (
                                    <p className={styles.ingredients_text_item} key={index}>
                                        {ingredient}
                                    </p>
                                ))}
                            </section>
                            <br />
                            <section className={styles.ingredients_container}>
                                <h1 className={styles.ingredients_section_title}>Instructions</h1>
                                {recipeData?.instructions_text_list?.map((instruction, index) => (
                                    <p className={styles.ingredients_text_item} key={index}>
                                        {instruction}
                                    </p>
                                ))}
                            </section>
                            <UiSectionSeparator />
                        </ul>
                    ) : (
                        <Custom404 />
                    )}
                </section>
                <section>{reviewsData ? <DisplayReviews reviewsToDisplay={reviewsData} /> : null}</section>
                <section>{authorLinks}</section>
            </main>
        </div>
    );
};

export async function getServerSideProps(context) {
    const id = context.params.RecipeDetails_Id;
    await store.dispatch<any>(loadRecipeDetailsAction({ id }));
    const serverRecipeData = store.getState().recipeReducer.requestedRecipeData;
    const isRequestedRecipeIdExist = serverRecipeData?.id === id;

    if (isRequestedRecipeIdExist) {
        await store.dispatch<any>(reviewsInRecipeAction({ recipeId: id }));
        const serverReviewsData = store.getState().recipeReducer.listOfFilteredReviews;
        return { props: { serverRecipeData, serverReviewsData } };
    } else {
        return { notFound: true };
    }
}

export default RecipeDetails;
