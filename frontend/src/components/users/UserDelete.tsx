import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import UiOptionsButton from '../ui/optionsForm/UiOptionsButton';
import { pageRoute } from '../../enums';
import { useDispatch } from 'react-redux';
import { userDeleteAction } from '../../redux/actions/userActions';

const UserDelete: React.FC<{ id: string }> = ({ id }) => {
    const dispatch = useDispatch();

    const onClick = async (e) => {
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
            <form onClick={onClick}>
                <UiOptionsButton>delete user</UiOptionsButton>
            </form>
        </main>
    );
};
UserDelete.propTypes = {
    id: PropTypes.string.isRequired,
};

export default UserDelete;
