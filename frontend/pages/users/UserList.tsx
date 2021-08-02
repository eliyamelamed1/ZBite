/* TODO - test
test displayedUsers is called and displays users
*/

import DisplayUsers from '../../components/users/DisplayUsers';
import React from 'react';
import { loadUserListAction } from '../../redux/actions/userActions';
import store from '../../redux/store';

const UserList = (props) => {
    const listOfUsers = props.listOfUsers;
    return (
        <main>
            <div data-testid='userList'></div>
            {listOfUsers ? <DisplayUsers usersToDisplay={listOfUsers} /> : null}
        </main>
    );
};

export async function getStaticProps() {
    await store.dispatch(loadUserListAction());
    const { listOfUsers } = store.getState().userReducer;
    return { props: { listOfUsers }, revalidate: 10 };
}
export default UserList;
