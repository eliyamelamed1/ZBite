// TODO add redirect after creating a recipe

import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { recipeCreateAction } from '../../redux/actions/recipe';

const recipeCreate = ({ isAuthenticated, recipeCreateAction }) => {
    const [onSubmitHaveBeenCalled, setOnSubmitHaveBeenCalled] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        flavor_type: 'Sour',
    });

    const { title, description, flavor_type } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    if (isAuthenticated == false) return <Redirect to='/' />;

    const onSubmit = (e) => {
        e.preventDefault();
        setOnSubmitHaveBeenCalled(true);

        recipeCreateAction(title, description, flavor_type);
    };
    const testing = (
        <main>
            <div>{onSubmitHaveBeenCalled ? <div data-testid='onSubmitHaveBeenCalled'></div> : null}</div>
        </main>
    );
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
            <div>{testing}</div>
        </div>
    );
};

export default connect(null, { recipeCreateAction })(recipeCreate);
