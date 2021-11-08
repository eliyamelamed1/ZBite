import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import Router from 'next/router';
import deleteIcon from '../../styles/icons/delete-input-icon.svg';
import { pageRoute } from '../../globals';
import { recipeCreateAction } from '../../redux/actions/recipeActions';
import styles from '../../styles/pages/recipeCreate.module.scss';

const RecipeCreate = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        image: '',
        title: '',
        description: '',
        flavor_type: 'Sour',
        cook_time: '',
        serving: '',
        ingredients: '',
        steps: '',
    });

    const { title, description, flavor_type, cook_time, serving, image, steps, ingredients } = data;

    const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
    const { isUserAuthenticated } = useSelector((state) => state.userReducer);

    isUserAuthenticated === false ? Router.push(pageRoute().home) : null;

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(recipeCreateAction({ title, description, flavor_type }));
            Router.push(pageRoute().home);
        } catch (err) {
            // console.log(err);
        }
    };

    const generalSection = () => (
        <section className={styles.general_section}>
            <div>
                <input
                    id='image'
                    type='file'
                    placeholder='image'
                    name='image'
                    value={image}
                    onChange={(e) => onChange(e)}
                    className={styles.image_input}
                />
                <label htmlFor='image' className={styles.image_label}>
                    Upload recipe image
                </label>
            </div>

            <input
                type='text'
                placeholder='title'
                name='title'
                value={title}
                onChange={(e) => onChange(e)}
                className={styles.title_input}
                required
            />
            <input
                type='text'
                placeholder='description'
                name='description'
                value={description}
                onChange={(e) => onChange(e)}
                className={styles.description_input}
                required
            />
            <div className={styles.cook_time_container}>
                <span className={styles.cook_time_text}>Cook time</span>
                <input
                    type='text'
                    placeholder='1hr 30min'
                    name='cook_time'
                    value={cook_time}
                    onChange={(e) => onChange(e)}
                    className={styles.cook_time_input}
                    required
                />
            </div>

            <div className={styles.serving_container}>
                <span className={styles.serving_text}>Serves</span>
                <input
                    type='text'
                    placeholder='2 people'
                    name='serving'
                    value={serving}
                    onChange={(e) => onChange(e)}
                    className={styles.serving_input}
                    required
                />
            </div>
        </section>
    );

    const ingredientSection = () => (
        <section className={styles.ingredients_section}>
            <h1 className={styles.ingredient_title}>Ingredients</h1>
            <li className={styles.ingredients_input_container}>
                <input
                    type='text'
                    placeholder='250g flour'
                    name='ingredients'
                    value={ingredients}
                    onChange={(e) => onChange(e)}
                    className={styles.ingredient_input}
                    required
                />
                <button className={styles.delete_button}>
                    {deleteIcon.src && <Image src={deleteIcon.src} alt='delete icon' width={50} height={60} />}
                </button>
            </li>
            <li>
                <input
                    id='image'
                    type='file'
                    placeholder='image'
                    name='image'
                    value={image}
                    onChange={(e) => onChange(e)}
                    className={styles.image_input}
                />
                <label htmlFor='image' className={styles.image_label} />
            </li>
            <button className={styles.add_ingredient}>+ Ingredient</button>
        </section>
    );

    const stepSection = () => (
        <section className={styles.steps_section}>
            <h1 className={styles.steps_title}>Steps</h1>
            <li className={styles.steps_input_container}>
                <input
                    type='text'
                    placeholder='Cut the meat'
                    name='steps'
                    value={steps}
                    onChange={(e) => onChange(e)}
                    className={styles.step_input}
                    required
                />
                <i className={styles.delete_button}>
                    {deleteIcon.src && <Image src={deleteIcon.src} alt='delete icon' width={50} height={60} />}
                </i>
            </li>
            <li>
                <input
                    id='image'
                    type='file'
                    placeholder='image'
                    name='image'
                    value={image}
                    onChange={(e) => onChange(e)}
                    className={styles.image_input}
                />
                <label htmlFor='image' className={styles.image_label} />
            </li>
            <button className={styles.add_step}>+ Step</button>
        </section>
    );

    return (
        <div data-testid='recipeCreate' className={styles.container}>
            <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
                {generalSection()}
                <hr className={styles.section_separator} />
                {ingredientSection()}
                <hr className={styles.section_separator} />
                {stepSection()}
                <hr className={styles.section_separator} />
                <button type='submit' className={styles.create_button}>
                    Create Recipe
                </button>
            </form>
        </div>
    );
};

export default RecipeCreate;
