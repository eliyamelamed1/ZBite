import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import { pageRoute } from '../../enums';
import { useDispatch } from 'react-redux';
import { userDeleteAction } from '../../redux/actions/userActions';

const UserDelete: React.FC<{ id: string }> = ({ id }) => {
    const dispatch = useDispatch();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(userDeleteAction({ id }));
        } catch {
            // TODO - add err msg
        }
    };
    // add permissions
    return (
        <main data-testid='userDelete'>
            <form onSubmit={onSubmit}>
                <button type='submit'>delete user</button>
            </form>
        </main>
    );
};
UserDelete.propTypes = {
    id: PropTypes.string.isRequired,
};

export default UserDelete;
