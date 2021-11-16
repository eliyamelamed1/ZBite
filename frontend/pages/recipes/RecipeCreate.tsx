import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import Router from 'next/router';
import deleteIcon from '../../styles/icons/delete-input-icon.svg';
import { pageRoute } from '../../globals';
import { recipeCreateAction } from '../../redux/actions/recipeActions';
import styles from '../../styles/pages/recipeCreate.module.scss';
import uploadImageIcon from '../../styles/icons/upload_image.png';

const RecipeCreate = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        recipe_image: '',
        title: '',
        description: '',
        flavor_type: 'Sour',
        cook_time: '',
        serving: '',
        ingredients: '',
        instructions: '',
    });
    const { title, description, flavor_type, cook_time, serving, recipe_image, instructions, ingredients } = data;

    const { isUserAuthenticated } = useSelector((state) => state.userReducer);
    isUserAuthenticated === false ? Router.push(pageRoute().home) : null;

    const onChangeText = (e) => setData((prevState) => ({ ...data, [e.target.name]: e.target.value }));
    const onChangeImage = (e) => {
        try {
            const imageSrc = URL.createObjectURL(e.target.files[0]);
            setData((prevState) => ({ ...prevState, [e.target.name]: imageSrc }));
        } catch {}
    };
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
            <input
                id='recipe_image'
                type='file'
                placeholder='image'
                name='recipe_image'
                onChange={onChangeImage}
                className={styles.image_input}
                accept='image/*'
            />
            <label htmlFor='recipe_image' className={styles.image_label}>
                {recipe_image ? (
                    <img src={recipe_image} />
                ) : (
                    <div className={styles.image_label}>
                        <Image src={uploadImageIcon} width={100} height={100} alt='recipe photo' />
                        <span className={styles.image_text}>Add recipe image</span>
                    </div>
                )}
            </label>
            <input
                type='text'
                placeholder='title'
                name='title'
                value={title}
                onChange={onChangeText}
                className={styles.title_input}
                required
            />
            <input
                type='text'
                placeholder='description'
                name='description'
                value={description}
                onChange={onChangeText}
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
                    onChange={onChangeText}
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
                    onChange={onChangeText}
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
                    onChange={onChangeText}
                    className={styles.ingredient_input}
                    required
                />
                <button className={styles.delete_button}>
                    {deleteIcon.src && <Image src={deleteIcon.src} alt='delete icon' width={50} height={60} />}
                </button>
            </li>
            <button className={styles.add_ingredient}>+ Ingredient</button>
        </section>
    );

    const instructionSection = () => (
        <section className={styles.instructions_section}>
            <h1 className={styles.instructions_title}>Instructions</h1>
            <li className={styles.instructions_input_container}>
                <input
                    type='text'
                    placeholder='Cut the meat'
                    name='instructions'
                    value={instructions}
                    onChange={onChangeText}
                    className={styles.instruction_input}
                    required
                />
                <i className={styles.delete_button}>
                    {deleteIcon.src && <Image src={deleteIcon.src} alt='delete icon' width={50} height={60} />}
                </i>
            </li>
            <li>
                <input
                    id='instruction_image'
                    type='file'
                    placeholder='image'
                    name='image'
                    onChange={onChangeText}
                    className={styles.image_input}
                />
                <label htmlFor='instruction_image' className={styles.image_label}>
                    <Image src={uploadImageIcon} width={100} height={100} alt='recipe photo' />
                    <span className={styles.image_text}>Add image</span>
                </label>
            </li>
            <button className={styles.add_instruction}>+ instruction</button>
        </section>
    );

    return (
        <div data-testid='recipeCreate' className={styles.container}>
            <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
                {generalSection()}
                <hr className={styles.section_separator} />
                {instructionSection()}
                <hr className={styles.section_separator} />
                {ingredientSection()}
                <hr className={styles.section_separator} />
                <button type='submit' className={styles.create_button}>
                    Create Recipe
                </button>
            </form>
        </div>
    );
};

export default RecipeCreate;
