// TODO - test onSubmit triggers useUpdateAction (fail/success scenarios)
// TODO - test propTypes

import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { userUpdateAction } from '../../redux/actions/userActions';

const UserUpdate: React.FC<{ id: string }> = ({ id }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const { name, email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
            <form onSubmit={onSubmit}>
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

export default UserUpdate;
