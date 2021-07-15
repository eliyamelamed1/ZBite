/* TODO - test
test displayedUsers is called and displays users
*/

import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import DisplayUsers from './DisplayUsers';
import { loadUserListAction } from '../../redux/actions/auth';

const userList = () => {
    const dispatch = useDispatch();
    const { userListData } = useSelector((state) => state.authReducer);

    useEffect(() => {
        try {
            dispatch(loadUserListAction());
        } catch {
            // TODO  show error massage
        }
    }, [dispatch]);

    return (
        <main>
            <div data-testid='userList'></div>
            <DisplayUsers usersToDisplay={userListData} />
        </main>
    );
};

export default connect()(userList);
