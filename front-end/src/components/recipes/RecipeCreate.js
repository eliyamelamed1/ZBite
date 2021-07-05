// TODO add redirect after creating a recipe
// TODO refractor to useDispatch, useSelector

// test form calls onSubmit
// test onSubmit dispatch action
// test redirection after creating recipe + if user is not authenticated

import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { recipeCreateAction } from '../../redux/actions/recipe';

const recipeCreate = () => {
    const dispatch = useDispatch();
    const [recipeCreated, setRecipeCreated] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        flavor_type: 'Sour',
    });

    const { title, description, flavor_type } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const isAuthenticatedData = useSelector((state) => state.authReducer.isAuthenticatedData);

    if (isAuthenticatedData == false || recipeCreated == true) return <Redirect to='/' />;

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(recipeCreateAction({ title, description, flavor_type }));
            setRecipeCreated(true);
        } catch {
            // TODO - add err msg
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

export default connect()(recipeCreate);
