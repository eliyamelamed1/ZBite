import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
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
UserDelete.propTypes = {
    id: PropTypes.string.isRequired,
};

export default UserDelete;
