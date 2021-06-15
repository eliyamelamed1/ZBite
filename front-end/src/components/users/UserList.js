import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { loadUserListAction } from '../../redux/actions/auth';

const userList = ({ loadUserListAction }) => {
    useEffect(() => {
        loadUserListAction();
    }, []);
    return (
        <main>
            <div data-testid='usersList'></div>
        </main>
    );
};

export default connect(null, { loadUserListAction })(userList);
