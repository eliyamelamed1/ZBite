/* - test onSubmit dispatch the action 
 test the redirect
 */

import { connect, useDispatch } from 'react-redux';

import React from 'react';
import { userDeleteAction } from '../../redux/actions/auth';

const UserDelete = ({ id }) => {
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(userDeleteAction({ id }));
        } catch {
            // TODO - add err msg
        }
    };
    // add permissions
    return (
        <main data-testid='userDelete'>
            <form onSubmit={(e) => onSubmit(e)}>
                <button type='submit'>delete user</button>
            </form>
        </main>
    );
};

export default connect()(UserDelete);
