// TODO - change PropTypes id to .isRequired
// test onSubmit dispatch actiob
// test form calls onSubmit

import React, { useState } from 'react';

import { recipeUpdateAction } from '../../redux/actions/recipe';
import { useDispatch } from 'react-redux';

const RecipeUpdate = ({ id }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        flavor_type: 'Sour',
    });

    const { title, description, flavor_type } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(recipeUpdateAction({ id, title, description, flavor_type }));
        } catch (e) {
            // TODO - add err msg
        }
    };

    return (
        <div data-testid='recipeUpdate'>
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
                <button type='submit'>update</button>
            </form>
        </div>
    );
};

export default RecipeUpdate;
