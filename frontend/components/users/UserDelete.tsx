import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import { pageRoute } from '../../globals';
import { useDispatch } from 'react-redux';
import { userDeleteAction } from '../../redux/actions/userActions';

const UserDelete = ({ id }) => {
    const dispatch = useDispatch();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(userDeleteAction({ id }));
            Router.push(pageRoute.home);
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
