import { useDispatch, useSelector } from 'react-redux';

import Router from 'next/router';
import { pageRoute } from '../../globals';
import { reviewCreateAction } from '../../redux/actions/recipeActions';
import { useState } from 'react';

const ReviewCreate = ({ recipe }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        stars: '',
        comment: '',
        image: '',
    });
    const { stars, comment, image } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { isUserAuthenticated } = useSelector((state) => state.userReducer);

    const onSubmit = (e) => {
        e.preventDefault();
        isUserAuthenticated === false ? Router.push(pageRoute().login) : null;
        try {
            dispatch(reviewCreateAction({ recipe, stars, comment, image }));
        } catch (err) {}
    };
    return (
        <div data-testid='reviewCreate'>
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
                    <input
                        type='image'
                        placeholder='image'
                        name='image'
                        value={image}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <button type='submit'>Create review</button>
            </form>
        </div>
    );
};
export default ReviewCreate;
