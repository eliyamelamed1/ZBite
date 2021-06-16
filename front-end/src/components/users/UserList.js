import React, { useEffect } from 'react';

import DisplayUsers from './DisplayUsers';
import { connect } from 'react-redux';
import { loadUserListAction } from '../../redux/actions/auth';

const userList = ({ loadUserListAction, userListData }) => {
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

const mapStateToProps = (state) => ({
    userListData: state.authReducer.userList,
});

export default connect(mapStateToProps, { loadUserListAction })(userList);
