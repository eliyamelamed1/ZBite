/* - test onSubmit dispatch the action 
 test the redirect
 */

import { connect, useDispatch } from 'react-redux';

import React from 'react';
import { userDeleteAction } from '../../redux/actions/auth';

// import { Redirect } from 'react-router-dom';

const userDelete = ({ id }) => {
    // if (redirect == true) return (<Redirect to='/' />).then(() => window.location.reload());
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(userDeleteAction(id));
    };
    // add permissions
    return (
        <div data-testid='userDelete'>
            <form onSubmit={(e) => onSubmit(e)}>
                <button type='submit'>delete user</button>
            </form>
        </div>
    );
};

export default connect()(userDelete);
