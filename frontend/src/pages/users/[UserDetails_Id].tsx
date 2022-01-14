import React, { useEffect, useState } from 'react';
import store, { RootState } from '../../redux/store';

import FollowUser from '../../components/followers/FollowUser';
import Head from 'next/head';
import Image from 'next/image';
import ScoreIcon from '../../assets/icons/score-icon.svg';
import UiOptionsDots from '../../components/ui/optionsForm/UiOptionsDots';
import UserDelete from '../../components/users/UserDelete';
import UserUpdate from '../../components/users/UserUpdate';
import imageLoader from '../../utils/imageLoader';
import { loadUserDetailsAction } from '../../redux/actions/userActions';
import styles from '../../styles/pages/userProfile.module.scss';
import uploadImageIcon from '../../assets/icons/upload_image.svg';
import { useSelector } from 'react-redux';

interface User {
    id: string;
    name: string;
    email: string;
    photo_main: any;
    followers: string[];
    following: string[];
    stars: any;
}

const UserDetails: React.FC<{ serverUserData: User }> = (props) => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [userData, setUserData] = useState<User>(props.serverUserData);
    const { loggedUserData, requestedUserData } = useSelector((state: RootState) => state.userReducer);

    useEffect(
        // updates userData after visiting userDetailsPage and then navigating to myProfilePage
        function migrateServerSideProps() {
            setUserData(props.serverUserData);
        },
        [props.serverUserData]
    );

    useEffect(
        // when updating requested account data (by following etc...) migrate the changes to the userData
        function migrateRequestedUserData() {
            /*
        bug after following a user and navigating to other account the data doesnt change
        the following if statement fix the bug
        TODO - TEST THIS STATEMENT
    */
            const isUserDataMatchReqId = requestedUserData?.id === userData?.id;
            if (isUserDataMatchReqId) {
                setUserData(requestedUserData);
            }
        },
        [requestedUserData, userData?.id]
    );

    useEffect(
        /*
        check if the userDetailsPage is the profile of the logged user.
        + when logged account update his data, migrate the changes to the profile page
    */
        function migrateLoggedUserData() {
            // TODO - TEST THIS STATEMENT
            const isUserDataMatchReqId = loggedUserData?.id == userData?.id;
            if (isUserDataMatchReqId) {
                setUserData(loggedUserData);
                setIsMyProfile(true);
            }
        },
        [userData?.id, loggedUserData]
    );

    const myProfileLinks = (
        <div data-testid='myProfileLinks'>
            <UserDelete id={userData?.id} />
            <UserUpdate id={userData?.id} emailPlaceholder={userData.email} namePlaceholder={userData.name} />
        </div>
    );
    return (
        <div className={styles.parent_container}>
            <Head>
                <title>ZBite - User Details Page </title>
                <meta name='description' content='recipes detail' />
            </Head>
            <section data-testid='userDetails' className={styles.section_container}>
                <UiOptionsDots sectionClass={styles.three_dots_section}>
                    <>{isMyProfile && myProfileLinks}</>
                </UiOptionsDots>
                <i className={styles.profile_pic}>
                    {userData.photo_main ? (
                        <Image
                            src={userData.photo_main}
                            width={100}
                            height={100}
                            alt='profilesad'
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
                <span className={styles.name}>{userData?.name}</span>
                <ul className={styles.score_container}>
                    <i className={styles.score_icon}>
                        {ScoreIcon.src && (
                            <Image src={ScoreIcon.src} width={100} height={100} alt='score icon' loader={imageLoader} />
                        )}
                    </i>
                    <span className={styles.score_text}>score: {userData.stars}</span>
                </ul>
                <ul className={styles.social_container}>
                    <li className={styles.followers_item}>
                        <span className={styles.followers_number}>{userData?.followers?.length}</span>
                        <span className={styles.followers_text}>Followers</span>
                    </li>
                    <li className={styles.posts_item}>
                        <span className={styles.posts_number}>52</span>
                        <span className={styles.posts_text}>Posts</span>
                    </li>

                    <li className={styles.following_item}>
                        <span className={styles.following_number}>{userData?.following?.length}</span>
                        <span data-testid='following count' className={styles.following_text}>
                            Following
                        </span>
                    </li>
                </ul>
                {isMyProfile || (
                    <div className={styles.follow_button_container}>
                        <FollowUser userToFollow={userData?.id} />
                    </div>
                )}
                <h1 className={styles.posts_button}>Posts</h1>
            </section>
        </div>
    );
};

export async function getServerSideProps(context) {
    const id = context.params.UserDetails_Id;
    await store.dispatch(loadUserDetailsAction({ id }));
    const serverUserData = store.getState().userReducer.requestedUserData;
    const isRequestedUserIdExist = serverUserData?.id === id;

    if (isRequestedUserIdExist) {
        return { props: { serverUserData } };
    } else {
        return { notFound: true };
    }
}
export default UserDetails;
