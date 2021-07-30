import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Custom404 from '../404';
import Head from 'next/head';
import UserDelete from '../../components/users/UserDelete';
import UserUpdate from '../../components/users/UserUpdate';
import { loadUserDetailsAction } from '../../redux/actions/auth';
import store from '../../redux/store';
import { useRouter } from 'next/router';

const UserDetails = (props) => {
    // TODO - create variable isMyProfile
    const [isMyProfile, setIsMyProfile] = useState(false);
    const { loggedUserDetails } = useSelector((state) => state.authReducer);
    const { searchedUserDetails } = props;
    const { id } = searchedUserDetails;

    useEffect(() => {
        if (loggedUserDetails?.id == searchedUserDetails.id) {
            setIsMyProfile(true);
        }
    }, [searchedUserDetails.id, loggedUserDetails]);

    const myProfileLinks = (
        <main data-testid='myProfileLinks'>
            <div>
                <UserDelete id={id} />
                <UserUpdate id={id} />
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
                    <p>user name: {searchedUserDetails?.name}</p>
                    <p>user email: {searchedUserDetails?.email}</p>
                    <p>following: {searchedUserDetails?.following?.length}</p>
                    <p>followers: {searchedUserDetails?.followers?.length}</p>
                </div>
                <div>{isMyProfile ? <div>{myProfileLinks}</div> : null}</div>
            </main>
        </React.Fragment>
    );
};

export async function getServerSideProps(context) {
    const id = context.params.UserDetails_Id;
    await store.dispatch(loadUserDetailsAction({ id }));
    const { searchedUserDetails } = store.getState().authReducer;

    // find a name to this function
    if (searchedUserDetails?.id === id) {
        return { props: { searchedUserDetails } };
    } else {
        return { notFound: true };
    }
}

export default UserDetails;
