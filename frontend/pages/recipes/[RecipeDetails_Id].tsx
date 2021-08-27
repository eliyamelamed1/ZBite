// check difference between props.match.params.id && props.id

import React, { useEffect, useState } from 'react';

import Custom404 from '../404';
import Head from 'next/head';
import Image from 'next/image';
import IsRecipeAuthor from '../../components/recipes/IsRecipeAuthor';
import Link from 'next/link';
import { loadRecipeDetailsAction } from '../../redux/actions/recipeActions';
import store from '../../redux/store';
import { useSelector } from 'react-redux';

const RecipeDetails = (props) => {
    const [recipeData, setRecipeData] = useState(props.serverRecipeData);
    const { requestedRecipeData } = useSelector((state) => state.recipeReducer);

    useEffect(
        function migrateRequestedRecipeData() {
            // when updating recipe data (title, description etc..) migrate the changes to the userData
            if (requestedRecipeData?.id === recipeData?.id) {
                setRecipeData(requestedRecipeData);
            }
        },
        [requestedRecipeData, recipeData?.id]
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
        return { props: { serverRecipeData } };
    } else {
        return { notFound: true };
    }
}

export default RecipeDetails;
