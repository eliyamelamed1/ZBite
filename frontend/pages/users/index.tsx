/* TODO - test
test displayedUsers is called and displays users
*/

import DisplayUsers from '../../components/users/DisplayUsers';
import React from 'react';
import { loadUserListAction } from '../../redux/actions/auth';
import { useSelector } from 'react-redux';
import { wrapperStore } from '../../redux/store';

const UserList = () => {
    const { listOfUsers } = useSelector((state) => state.authReducer);

    return (
        <main>
            <div data-testid='userList'></div>
            {listOfUsers ? <DisplayUsers usersToDisplay={listOfUsers} /> : null}
        </main>
    );
};
export const getStaticProps = wrapperStore.getStaticProps((store) => async () => {
    await store.dispatch(loadUserListAction());
});

export default UserList;
