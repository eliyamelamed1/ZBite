import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import Router from 'next/router';
import UiButton from '../ui/UiButton';
import UiInput from '../ui/UiInput';
import UiPopUp from '../ui/UiPopUp';
import closeIcon from '../../styles/icons/x.svg';
import { pageRoute } from '../../globals';
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
    const [displayReviewForm, setDisplayReviewForm] = useState(false);
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisplayReviewForm(true);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        isUserAuthenticated === false ? Router.push(pageRoute().login) : null;
        try {
            dispatch(reviewCreateAction({ recipeId, stars, comment, image }));
            setDisplayReviewForm(false);
        } catch (err) {}
    };

    const reviewForm = () => (
        <UiPopUp onSubmit={onSubmit}>
            <i onClick={() => setDisplayReviewForm(false)}>
                {closeIcon.src && <img src={closeIcon.src} alt='logo icon' height={100} width={100} />}
            </i>
            <h1>Leave a review</h1>
            <UiInput type='text' placeholder='stars' name='stars' value={stars} onChange={onChange} required />
            <UiInput type='text' placeholder='comment' name='comment' value={comment} onChange={onChange} required />
            <input type='image' placeholder='image' name='image' value={image} onChange={(e) => onChange(e)} />
            <UiButton reverse={true}>Create review</UiButton>
        </UiPopUp>
    );

    return (
        <div data-testid='reviewCreate'>
            <form onClick={(e) => handleSubmit(e)}>
                <UiButton reverse={true}>review</UiButton>
            </form>
            {displayReviewForm && reviewForm()}
        </div>
    );
};

export default ReviewCreate;
