import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Custom404 from '../404';
import FollowUnFollow from '../../components/followers/FollowUnFollow';
import Head from 'next/head';
import UserDelete from '../../components/users/UserDelete';
import UserUpdate from '../../components/users/UserUpdate';
import { loadUserDetailsAction } from '../../redux/actions/auth';
import store from '../../redux/store';

const UserDetails = (props) => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const { loggedUserDetails, searchedUserDetails } = useSelector((state) => state.authReducer);
    const [userData, setUserData] = useState(props.userData);

    useEffect(() => {
        // updates userData when navigating between accounts on the browser
        if (props.userDetails) {
            setUserData(props.userDetails);
        }
    }, [props.userDetails]);

    useEffect(() => {
        /*
        when updating searched account data (by following etc...) migrate the changes to the userData
        */

        if (searchedUserDetails) {
            setUserData(searchedUserDetails);
        }
    }, [searchedUserDetails]);

    useEffect(() => {
        /*
         check if the userDetailsPage is the profile of the logged user.
         when updating logged account data migrate the changes to the userData
        */
        if (loggedUserDetails?.id == userData?.id) {
            setUserData(loggedUserDetails);
            setIsMyProfile(true);
        }
    }, [userData?.id, loggedUserDetails]);

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
                    <p>user name: {userData?.name}</p>
                    <p>user email: {userData?.email}</p>
                    <p>following: {userData?.following?.length}</p>
                    <p>followers: {userData?.followers?.length}</p>
                </div>
                <div>{isMyProfile ? <div>{myProfileLinks}</div> : <FollowUnFollow user_followed={userData?.id} />}</div>
            </main>
        </React.Fragment>
    );
};

export async function getServerSideProps(context) {
    const id = context.params.UserDetails_Id;
    await store.dispatch(loadUserDetailsAction({ id }));
    const userData = store.getState().authReducer.searchedUserDetails;

    const isUserDataIdMatchSearchedId = userData?.id === id;

    // find a name to this function
    if (isUserDataIdMatchSearchedId) {
        return { props: { userData } };
    } else {
        return { notFound: true };
    }
}

export default UserDetails;
