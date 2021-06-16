import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import DisplayUsers from './DisplayUsers';
import { loadUserListAction } from '../../redux/actions/auth';

const userList = ({ loadUserListAction }) => {
    const userListData = useSelector((state) => state.authReducer.userListData);
    useEffect(() => {
        loadUserListAction();
    }, []);
    return (
        <main>
            <div data-testid='usersList'></div>
            <DisplayUsers users={userListData} />
        </main>
    );
};

export default connect(null, { loadUserListAction })(userList);
