import React, { useEffect, useState } from 'react';

import FollowUser from '../../components/followers/FollowUser';
import Head from 'next/head';
import Image from 'next/image';
import ProfileIcon from '../../styles/icons/profile._pic.svg';
import ScoreIcon from '../../styles/icons/score-icon.svg';
import UserDelete from '../../components/users/UserDelete';
import UserUpdate from '../../components/users/UserUpdate';
import { loadUserDetailsAction } from '../../redux/actions/userActions';
import store from '../../redux/store';
import styles from '../../styles/pages/userProfile.module.scss';
import { useSelector } from 'react-redux';

interface User {
    id: string;
    name: string;
    email: string;
    followers: string[];
    following: string[];
}

const UserDetails: React.FC<{ serverUserData: User }> = (props) => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [userData, setUserData] = useState<User>(props.serverUserData);
    const { loggedUserData, requestedUserData } = useSelector((state) => state.userReducer);

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
        <main data-testid='myProfileLinks'>
            <div>
                <UserDelete id={userData?.id} />
                <UserUpdate id={userData?.id} />
            </div>
        </main>
    );
    return (
        <div className={styles.parent_container}>
            <Head>
                <title>ZBite - User Details Page </title>
                <meta name='description' content='recipes detail' />
            </Head>
            <section data-testid='userDetails' className={styles.section_container}>
                <i className={styles.profile_pic}>
                    {ProfileIcon.src && <Image src={ProfileIcon.src} width={100} height={100} alt='profile pic' />}
                </i>
                <span className={styles.name}>{userData?.name}</span>
                <ul className={styles.score_container}>
                    <i className={styles.score_icon}>
                        {ScoreIcon.src && <Image src={ScoreIcon.src} width={100} height={100} alt='score icon' />}
                    </i>
                    <span className={styles.score}>score: 7.6K</span>
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
                <div className={styles.follow_button_container}>
                    {isMyProfile || <FollowUser userToFollow={userData?.id} />}
                </div>
                <ul className={styles.option_list}>
                    <button className={`${styles.posts_button} ${styles.option_list_active}`}>Posts</button>
                    <button className={styles.edit_button}>Edit</button>
                </ul>
            </section>
            <div>{isMyProfile && <div>{myProfileLinks}</div>}</div>
            <p>{userData?.email}</p>
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
