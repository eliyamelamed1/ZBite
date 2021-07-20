/* TODO - test
test displayedUsers is called and displays users
*/

import DisplayUsers from '../../components/users/DisplayUsers';
import React from 'react';
import { loadUserListAction } from '../../redux/actions/auth';
import { store } from '../../redux/store';

const UserList = ({ listOfUsers }) => {
    return (
        <main>
            <div data-testid='userList'></div>
            {listOfUsers ? <DisplayUsers usersToDisplay={listOfUsers} /> : null}
        </main>
    );
};

export async function getStaticProps(context) {
    await store.dispatch(loadUserListAction());
    const { listOfUsers } = await store.getState().authReducer;
    return { props: { listOfUsers }, revalidate: 10 };
}
export default UserList;
