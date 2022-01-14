// TODO - test onSubmit triggers useUpdateAction (fail/success scenarios)
// TODO - test propTypes

import React, { useState } from 'react';

import UiButton from '../ui/UiButton';
import UiInput from '../ui/UiInput';
import UiOptionsButton from '../ui/optionsForm/UiOptionsButton';
import UiPhotoInput from '../ui/UiPhotoInput';
import UiPopUp from '../ui/UiPopUp';
import { useDispatch } from 'react-redux';
import { userUpdateAction } from '../../redux/actions/userActions';

const UserUpdate: React.FC<{ id: string; emailPlaceholder: string; namePlaceholder: string }> = ({
    id,
    emailPlaceholder,
    namePlaceholder,
}) => {
    const [displayForm, setDisplayForm] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoMain: null,
        photoMainBlob: '',
    });
    const { name, email, photoMain, photoMainBlob } = formData;

    const onChangeText = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onChangeImage = async (e) => {
        try {
            setFormData((prevState) => ({ ...prevState, photoMain: e.target.files[0] as File }));
            const imageBlob = await URL.createObjectURL(e.target.files[0]);
            setFormData((prevState) => ({ ...prevState, [e.target.name]: imageBlob }));
        } catch {}
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(userUpdateAction({ id, email, name, photoMain }));
            setDisplayForm(false);
        } catch {
            // TODO - add error massage
        }
    };

    const userUpdateForm = (
        <UiPopUp onSubmit={onSubmit} setDisplayForm={setDisplayForm}>
            <h1>Update User</h1>
            <UiPhotoInput onChangeImage={onChangeImage} photoMainBlob={photoMainBlob} />
            <UiInput
                type='text'
                placeholder={`${namePlaceholder}`}
                name='name'
                value={name}
                onChange={onChangeText}
                required
            />
            <UiInput
                type='text'
                placeholder={`${emailPlaceholder}`}
                name='email'
                value={email}
                onChange={onChangeText}
                required
            />
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
