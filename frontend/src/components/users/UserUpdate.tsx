// TODO - test onSubmit triggers useUpdateAction (fail/success scenarios)
// TODO - test propTypes

import React, { useState } from 'react';

import UiButton from '../ui/UiButton';
import UiOptionsButton from '../ui/optionsForm/UiOptionsButton';
import UiPopUp from '../ui/UiPopUp';
import { useDispatch } from 'react-redux';
import { userUpdateAction } from '../../redux/actions/userActions';

const UserUpdate: React.FC<{ id: string }> = ({ id }) => {
    const [displayForm, setDisplayForm] = useState(false);
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

    const userUpdateForm = (
        <UiPopUp onSubmit={onSubmit} setDisplayForm={setDisplayForm}>
            <h1>Update User</h1>
            <div>
                <input type='text' placeholder='name' name='name' value={name} onChange={(e) => onChange(e)} required />
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
            <UiButton reverse={true}>Submit</UiButton>
        </UiPopUp>
    );

    return (
        <div data-testid='userUpdate'>
            <form onClick={() => setDisplayForm(!displayForm)}>
                <UiOptionsButton>update user</UiOptionsButton>
            </form>

            {displayForm && userUpdateForm}
        </div>
    );
};

export default UserUpdate;
