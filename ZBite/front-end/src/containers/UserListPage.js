import { Helmet, HelmetProvider } from 'react-helmet-async';

import DisplayUsers from '../components/users/DisplayUsers';
import React from 'react';
import UserList from '../components/users/UserList';
import { connect } from 'react-redux';

const userListPage = ({ userList }) => {
    return (
        <main data-testid='usersListPage'>
            <HelmetProvider>
                <Helmet>
                    <title>ZBite - users</title>
                    <meta name='description' content='users list page' />
                </Helmet>
            </HelmetProvider>
            <section>
                <UserList />
            </section>
            <section>
                <DisplayUsers users={userList} />
            </section>
        </main>
    );
};

const mapStateToProps = (state) => ({
    userList: state.authReducer.userList,
});

export default connect(mapStateToProps, null)(userListPage);
