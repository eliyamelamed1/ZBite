// TODO - test onSubmit triggers useUpdateAction (fail/success scenarios)
// TODO - test propTypes

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { userUpdateAction } from '../../redux/actions/userActions';

const UserUpdate = ({ id, setUserData }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const { name, email } = formData;
    const { loggedUserData } = useSelector((state) => state.userReducer);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(
        function updateLoggedUserData() {
            // TODO - need to be tested
            setUserData(loggedUserData);
        },
        [id, loggedUserData, setUserData]
    );

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(userUpdateAction({ id, email, name }));
        } catch {
            // TODO - add error massage
        }
    };

    return (
        <div data-testid='userUpdate'>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <input
                        type='text'
                        placeholder='name'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>

                <button type='submit'>update user</button>
            </form>
        </div>
    );
};
UserUpdate.propTypes = {
    id: PropTypes.string.isRequired,
};

export default UserUpdate;
