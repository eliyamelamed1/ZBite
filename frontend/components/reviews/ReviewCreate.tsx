import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import Router from 'next/router';
import UiButton from '../ui/UiButton';
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
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);

    const onSubmit = async (e) => {
        e.preventDefault();
        isUserAuthenticated === false ? Router.push(pageRoute().login) : null;
        try {
            dispatch(reviewCreateAction({ recipeId, stars, comment, image }));
        } catch (err) {}
    };

    const reviewForm = () => {
        <form onSubmit={(e) => onSubmit(e)}>
            <div>
                <input
                    type='text'
                    placeholder='stars'
                    name='stars'
                    value={stars}
                    onChange={(e) => onChange(e)}
                    required
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder='comment'
                    name='comment'
                    value={comment}
                    onChange={(e) => onChange(e)}
                    required
                />
            </div>
            <div>
                <input type='image' placeholder='image' name='image' value={image} onChange={(e) => onChange(e)} />
            </div>
            <button type='submit'>Create review</button>
        </form>;
    };

    return (
        <div data-testid='reviewCreate'>
            <UiButton reverse={true}>rate</UiButton>
        </div>
    );
};

export default ReviewCreate;
