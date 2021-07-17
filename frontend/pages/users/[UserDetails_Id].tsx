import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Custom404 from '../404';
import Head from 'next/head';
import UserDelete from '../../components/users/UserDelete';
import UserUpdate from '../../components/users/UserUpdate';
import { loadUserDetailsAction } from '../../redux/actions/auth';
import { useRouter } from 'next/router';

const UserDetails = () => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const { loggedUserDetails, searchedUserDetails } = useSelector((state) => state.authReducer);
    const router = useRouter();
    const dispatch = useDispatch();
    const id = router.query.UserDetails_Id;

    useEffect(() => {
        try {
            dispatch(loadUserDetailsAction({ id }));
        } catch {
            // TODO - add err msg
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (searchedUserDetails) {
            if (Object.prototype.hasOwnProperty.call(searchedUserDetails, 'name')) {
                setUserExist(true);
            }
        }
    }, [searchedUserDetails]);

    useEffect(() => {
        if (loggedUserDetails?.id == id) {
            setIsAuthor(true);
        }
    }, [id, loggedUserDetails]);

    const guestLinks = (
        <main data-testid='guestLinks'>
            {userExist ? (
                <div>
                    <p>user name: {searchedUserDetails.name}</p>
                    <p>user email: {searchedUserDetails.email}</p>
                </div>
            ) : (
                <Custom404 />
            )}
        </main>
    );

    const authorLinks = (
        <main data-testid='authorLinks'>
            <UserDelete id={id} />
            <UserUpdate id={id} />
            {loggedUserDetails ? (
                <div>
                    <div>user name: {loggedUserDetails.name}</div>
                    <div>user email: {loggedUserDetails.email}</div>
                </div>
            ) : (
                { guestLinks }
            )}
        </main>
    );

    return (
        <div data-testid='userDetails'>
            <Head>
                <title>ZBite - User Details Page </title>
                <meta name='description' content='recipes detail' />
            </Head>
            <div>
                <div>{isAuthor == true ? <div>{authorLinks}</div> : <div>{guestLinks}</div>}</div>
            </div>
        </div>
    );
};

export default UserDetails;
