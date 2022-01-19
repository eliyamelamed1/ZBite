import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import Router from 'next/router';
import UiButton from '../ui/UiButton';
import UiInput from '../ui/UiInput';
import UiOptionsDots from '../ui/optionsForm/UiOptionsDots';
import UiPopUp from '../ui/UiPopUp';
import UiRatingForm from '../ui/UiRatingForm';
import { loadLoggedUserDataAction } from '../../redux/actions/userActions';
import { pageRoute } from '../../enums';
import { reviewCreateAction } from '../../redux/actions/recipeActions';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ReviewCreate: React.FC<{ recipeId: string }> = ({ recipeId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        comment: '',
        starsValue: 0,
    });
    const { comment, starsValue } = formData;
    const [displayForm, setDisplayForm] = useState(false);

    const onChange = (e) => {
        console.log(e);

        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const { isUserAuthenticated, loggedUserData } = useSelector((state: RootState) => state.userReducer);

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
            await dispatch(reviewCreateAction({ recipeId, stars: starsValue, comment }));
            setDisplayForm(false);

            // dispatch to refresh logged user star
            if (loggedUserData?.id == recipeId) await dispatch(loadLoggedUserDataAction());
        } catch (err) {}
    };

    const reviewSection = () => (
        <UiPopUp onSubmit={onSubmit} setDisplayForm={setDisplayForm}>
            <h1>Leave a review</h1>
            <UiRatingForm onChange={onChange} />
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
