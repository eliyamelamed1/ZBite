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
import UiOptionsDots from '../../components/ui/optionsForm/UiOptionsDots';
import UiSaves from '../../components/ui/UiSaves';
import UiSectionSeparator from '../../components/ui/UiSectionSeperator';
import UiStars from '../../components/ui/UiStars';
import imageLoader from '../../utils/imageLoader';
import { loadRecipeDetailsAction } from '../../redux/actions/recipeActions';
import { reviewsInRecipeAction } from '../../redux/actions/recipeActions';
import styles from '../../styles/pages/recipeDetails.module.scss';
import uploadImageIcon from '../../assets/icons/upload_image.svg';
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
            if (isRecipeDataMatchReqId) setRecipeData(requestedRecipeData);
        },
        [requestedRecipeData, recipeData?.id]
    );

    useEffect(
        // when updating reviews data migrate the changes to the reviewsData
        function migrateListOfFilteredReviews() {
            if (listOfFilteredReviews == null) return null;
            if (listOfFilteredReviews.length === 0) {
                return setReviewsData([]);
            }

            const updatedReviewList = [];
            for (const review of listOfFilteredReviews) {
                const isReviewsMatchRecipe = review.recipe === recipeData?.id;
                if (isReviewsMatchRecipe) updatedReviewList.push(review);
            }

            if (updatedReviewList.length !== 0) return setReviewsData(updatedReviewList);
        },
        [listOfFilteredReviews, recipeData]
    );

    return (
        <div className={styles.parent}>
            <Head>
                {recipeData ? <title>ZBite | {`${recipeData.title}`}</title> : <title>ZBite - recipes </title>}
                <meta name='description' content='recipes detail' />
            </Head>
            <main className={styles.main} data-testid='recipeDetails'>
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
                                <UiOptionsDots lying={false}>
                                    {recipeData && <IsRecipeAuthor recipe={recipeData} />}
                                </UiOptionsDots>

                                <i className={styles.profile_image_container}>
                                    {recipeData?.author?.photo_main ? (
                                        <Image
                                            src={recipeData?.author?.photo_main}
                                            width={100}
                                            height={100}
                                            alt='profile pic'
                                            loader={imageLoader}
                                        />
                                    ) : (
                                        uploadImageIcon.src && (
                                            <Image
                                                src={uploadImageIcon.src}
                                                width={100}
                                                height={100}
                                                alt='profile pic'
                                                loader={imageLoader}
                                            />
                                        )
                                    )}
                                </i>
                                <a>
                                    <Link href={`/users/${recipeData?.author?.id}/`} passHref>
                                        <h1 className={styles.author_name}>
                                            {recipeData?.author?.name} asd asd asd asd
                                        </h1>
                                    </Link>
                                </a>

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
                            <p className={styles.description}>{recipeData?.description}</p>
                            <div className={styles.cook_time_and_serving_container}>
                                <p className={styles.cook_time}>
                                    cook time:
                                    <span> {recipeData?.cook_time}</span>
                                </p>
                                <p className={styles.serving}>
                                    serving: <span> {recipeData?.serving}</span>
                                </p>
                            </div>
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
                <section>{reviewsData && <DisplayReviews reviewsToDisplay={reviewsData} />}</section>
            </main>
        </div>
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
