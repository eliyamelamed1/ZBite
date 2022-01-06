import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import Router from 'next/router';
import UiButton from '../ui/UiButton';
import UiInput from '../ui/UiInput';
import UiPopUp from '../ui/UiPopUp';
import { pageRoute } from '../../enums';
import { reviewCreateAction } from '../../redux/actions/recipeActions';
import { useState } from 'react';

const ReviewCreate: React.FC<{ recipeId: string }> = ({ recipeId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        stars: '',
        comment: '',
        image: '',
    });
    const { stars, comment, image } = formData;
    const [displayForm, setDisplayForm] = useState(false);
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isUserAuthenticated) await Router.push(pageRoute().login);
        setDisplayForm(true);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        isUserAuthenticated === false ? Router.push(pageRoute().login) : null;
        try {
            dispatch(reviewCreateAction({ recipeId, stars, comment, image }));
            setDisplayForm(false);
        } catch (err) {}
    };

    const reviewSection = () => (
        <UiPopUp onSubmit={onSubmit} setDisplayForm={setDisplayForm}>
            <h1>Leave a review</h1>
            <UiInput type='text' placeholder='stars' name='stars' value={stars} onChange={onChange} required />
            <UiInput type='text' placeholder='comment' name='comment' value={comment} onChange={onChange} required />
            {/* <input type='image' placeholder='image' name='image' value={image} onChange={(e) => onChange(e)} /> */}
            <UiButton reverse={true}>submit</UiButton>
        </UiPopUp>
    );

    return (
        <div data-testid='reviewCreate'>
            <form onClick={(e) => handleSubmit(e)}>
                <UiButton reverse={true}>review</UiButton>
            </form>
            {displayForm && reviewSection()}
        </div>
    );
};

export default ReviewCreate;
