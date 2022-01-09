import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import Router from 'next/router';
import UiButton from '../ui/UiButton';
import UiInput from '../ui/UiInput';
import UiOptionsDots from '../ui/optionsForm/UiOptionsDots';
import UiPopUp from '../ui/UiPopUp';
import UiStarsButtons from '../ui/UiStarsButtons';
import { pageRoute } from '../../enums';
import { reviewCreateAction } from '../../redux/actions/recipeActions';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ReviewCreate: React.FC<{ recipeId: string }> = ({ recipeId }) => {
    const dispatch = useDispatch();
    const [starsValue, setStarsValue] = useState(0);
    const [formData, setFormData] = useState({
        comment: '',
    });
    const { comment } = formData;
    const [displayForm, setDisplayForm] = useState(false);

    const onChange = (e) => {
        e.preventDefault();

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const { isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);

    const toggleReviewForm = (e) => {
        e.preventDefault();
        if (!isUserAuthenticated) return Router.push(pageRoute().login);
        setDisplayForm(true);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (starsValue === 0) return toast.error('stars are required');
        isUserAuthenticated === false ? Router.push(pageRoute().login) : null;

        try {
            dispatch(reviewCreateAction({ recipeId, stars: starsValue, comment }));
            setDisplayForm(false);
        } catch (err) {}
    };

    const reviewSection = () => (
        <UiPopUp onSubmit={onSubmit} setDisplayForm={setDisplayForm}>
            <h1>Leave a review</h1>
            <UiStarsButtons setStarsValue={setStarsValue} starsValue={starsValue} />
            <UiInput type='text' placeholder='comment' name='comment' value={comment} onChange={onChange} required />
            <UiButton reverse={true}>submit</UiButton>
        </UiPopUp>
    );

    return (
        <div data-testid='reviewCreate'>
            <form onClick={toggleReviewForm}>
                <UiButton reverse={true}>review</UiButton>
            </form>
            {displayForm && reviewSection()}
        </div>
    );
};

export default ReviewCreate;
