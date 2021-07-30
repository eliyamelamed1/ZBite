import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Router from 'next/router';
import { recipeCreateAction } from '../../redux/actions/recipe';

const RecipeCreate = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        flavor_type: 'Sour',
    });

    const { title, description, flavor_type } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { isUserAuthenticated } = useSelector((state) => state.userReducer);

    if (isUserAuthenticated == false) {
        Router.push('/');
    }
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(recipeCreateAction({ title, description, flavor_type }));
            Router.push('/');
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <div data-testid='recipeCreate'>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        value={title}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='description'
                        name='description'
                        value={description}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='flavor_type'>Choose Flavor</label>
                    <select name='flavor_type' onChange={(e) => onChange(e)} value={flavor_type} required>
                        <option>Sour</option>
                        <option>Sweet</option>
                        <option>Salty</option>
                    </select>
                </div>
                <button type='submit'>Create Recipe</button>
            </form>
        </div>
    );
};

export default RecipeCreate;
