// TODO - change PropTypes id to .isRequired
// test onSubmit dispatch actiob
// test form calls onSubmit

import React, { useState } from 'react';

import { recipeUpdateAction } from '../../redux/actions/recipeActions';
import { useDispatch } from 'react-redux';

const RecipeUpdate: React.FC<{ id: string }> = ({ id }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const { title, description } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(recipeUpdateAction({ id, title, description }));
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
                <button type='submit'>update</button>
            </form>
        </div>
    );
};

export default RecipeUpdate;
