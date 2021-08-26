import React, { useEffect, useState } from 'react';

import FollowUnFollow from '../../components/followers/FollowUnFollow';
import Head from 'next/head';
import UserDelete from '../../components/users/UserDelete';
import UserUpdate from '../../components/users/UserUpdate';
import { loadUserDetailsAction } from '../../redux/actions/userActions';
import store from '../../redux/store';
import { useSelector } from 'react-redux';

const UserDetails = (props) => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [userData, setUserData] = useState(props.serverUserData);
    const { loggedUserData, requestedUserData } = useSelector((state) => state.userReducer);
    const userReducer = useSelector((state) => state.userReducer);
    useEffect(
        function migrateServerSideProps() {
            // updates userData when navigating between accounts on the browser
            if (props.serverUserData) {
                setUserData(props.serverUserData);
            }
        },
        [props.serverUserData]
    );

    useEffect(
        function migrateRequestedUserData() {
            // when updating requested account data (by following etc...) migrate the changes to the userData
            /*
        bug after following a user and navigating to other account the data doesnt change
        the following if statement fix the bug
        */
            if (requestedUserData?.id === userData?.id) {
                setUserData(requestedUserData);
            }
        },
        [requestedUserData, userData?.id]
    );

    useEffect(
        function migrateLoggedUserData() {
            /*
         check if the userDetailsPage is the profile of the logged user.
         + when logged account update his data, migrate the changes to the profile page
        */
            if (loggedUserData?.id == userData?.id) {
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
        <React.Fragment>
            <Head>
                <title>ZBite - User Details Page </title>
                <meta name='description' content='recipes detail' />
            </Head>
            <main data-testid='userDetails'>
                <div>
                    <p>user name:</p>
                    <p>{userData?.name}</p>
                    <p>user email:</p>
                    <p>{userData?.email}</p>
                    <p>following: {userData?.following?.length}</p>
                    <p>followers: {userData?.followers?.length}</p>
                </div>
                <div>{isMyProfile ? <div>{myProfileLinks}</div> : <FollowUnFollow userToFollow={userData?.id} />}</div>
            </main>
        </React.Fragment>
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
