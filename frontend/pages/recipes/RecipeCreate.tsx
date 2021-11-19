import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import Router from 'next/router';
import deleteIcon from '../../styles/icons/delete-input-icon.svg';
import editInput from '../../styles/icons/edit_input.svg';
import { pageRoute } from '../../globals';
import { recipeCreateAction } from '../../redux/actions/recipeActions';
import saveInput from '../../styles/icons/save_changes.svg';
import styles from '../../styles/pages/recipeCreate.module.scss';
import uploadImageIcon from '../../styles/icons/upload_image.svg';

const RecipeCreate = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        // recipe fields
        recipe_image: '',
        title: '',
        description: '',
        cookTime: '',
        serving: '',
        instructionList: [],
        ingredientList: [],

        // functionality fields
        instruction: '',
        ingredient: '',
        modifiedText: '',
        inputId: '',
    });
    const {
        title,
        description,
        cookTime,
        serving,
        recipe_image,
        instructionList,
        ingredientList,

        instruction,
        ingredient,
        modifiedText,
        inputId,
    } = data;
    const { isUserAuthenticated } = useSelector((state) => state.userReducer);
    isUserAuthenticated === false ? Router.push(pageRoute().home) : null;

    // ------------Functions------------
    const onChangeText = (e) => setData({ ...data, [e.target.name]: e.target.value });
    const onChangeImage = async (e) => {
        try {
            const imageSrc = await URL.createObjectURL(e.target.files[0]);
            setData((prevState) => ({ ...prevState, [e.target.name]: imageSrc }));

            return imageSrc;
        } catch {}
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        // TODO redirect only on dispatch success
        try {
            dispatch(recipeCreateAction({ title, description,  }));
            Router.push(pageRoute().home);
        } catch (err) {
            // console.log(err);
        }
    };
    const addInputContainer = (value) => {
        if (value === 'instruction') {
            if (instruction === '') return;

            const newInstruction = {
                id: new Date().getTime(),
                text: instruction,
                image: '',
            };
            const newInstructionList = instructionList.concat(newInstruction);

            setData((prevState) => ({ ...prevState, instructionList: newInstructionList, instruction: '' }));
        }
        if (value === 'ingredient') {
            if (ingredient === '') return;

            const newIngredient = {
                id: new Date().getTime(),
                text: ingredient,
            };
            const newIngredientList = ingredientList.concat(newIngredient);

            setData((prevState) => ({ ...prevState, ingredientList: newIngredientList, ingredient: '' }));
        }
    };

    const saveInstructionImage = async (e, id) => {
        // TODO the only id that is send is of the first item in the array
        const imageSrc = await onChangeImage(e);
        const updatedInstructionList = await [...instructionList].map((instruction) => {
            if (instruction.id === id) {
                instruction.image = imageSrc;
            }
            return instruction;
        });

        setData((prevState) => ({ ...prevState, instructionList: updatedInstructionList }));
    };

    const deleteInputContainer = (id, value) => {
        if (value === 'instruction') {
            let updatedInstructionList = [...instructionList].filter((instruction) => instruction.id !== id);
            setData((prevState) => ({ ...prevState, instructionList: updatedInstructionList }));
        }
        if (value === 'ingredient') {
            let updatedIngredientList = [...ingredientList].filter((ingredient) => ingredient.id !== id);
            setData((prevState) => ({ ...prevState, ingredientList: updatedIngredientList }));
        }
    };

    const handleEdits = (id, value) => {
        if (modifiedText === '') return;
        if (value === 'instruction') {
            const updatedInstructionList = [...instructionList].map((instruction) => {
                if (instruction.id === id) {
                    instruction.text = modifiedText;
                }

                return instruction;
            });

            setData((prevState) => ({ ...prevState, instructionList: updatedInstructionList, inputId: null }));
        }
        if (value === 'ingredient') {
            const updatedIngredientList = [...ingredientList].map((ingredient) => {
                if (ingredient.id === id) {
                    ingredient.text = modifiedText;
                }

                return ingredient;
            });

            setData((prevState) => ({ ...prevState, ingredientList: updatedIngredientList, inputId: null }));
        }
    };

    // ------------Sections-------------
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
                        {uploadImageIcon.src && (
                            <Image src={uploadImageIcon.src} width={100} height={100} alt='recipe photo' />
                        )}
                        <span className={styles.image_text}>Add recipe image</span>
                    </div>
                )}
            </label>
            <input
                type='text'
                placeholder='Title'
                name='title'
                value={title}
                onChange={onChangeText}
                className={styles.title_input}
                required
            />
            <input
                type='text'
                placeholder='Description'
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
                    name='cookTime'
                    value={cookTime}
                    onChange={onChangeText}
                    className={styles.cook_time_input}
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
                />
            </div>
        </section>
    );

    const instructionSection = () => (
        <section className={styles.instructions_section}>
            <h1 className={styles.instructions_title}>Instructions</h1>
            <input
                type='text'
                placeholder='add onions to the mixture'
                onChange={onChangeText}
                value={instruction}
                name='instruction'
                className={styles.text_input}
            />
            <button
                onClick={() => addInputContainer('instruction')}
                type='button'
                className={styles.add_instruction}
                placeholder='add instruction'
            >
                + Instruction
            </button>
            {instructionList.map((instruction) => (
                <section key={instruction.id} className={styles.new_instruction_container}>
                    <div className={styles.image_input_container}>
                        <input
                            id={instruction.id}
                            type='file'
                            className={styles.image_input}
                            accept='image/png, image/jpg, image/jpeg, image/svg'
                            onChange={(e) => saveInstructionImage(e, instruction.id)}
                        />
                        <label htmlFor={instruction.id} className={styles.image_label} data-testid='upload_image'>
                            {instruction.image ? (
                                <img src={instruction.image} className={styles.uploaded_image} />
                            ) : (
                                uploadImageIcon.src && (
                                    <Image src={uploadImageIcon.src} width={100} height={100} alt='recipe photo' />
                                )
                            )}
                        </label>
                    </div>
                    <div className={styles.input_and_actions_container}>
                        <div className={styles.input_container}>
                            {instruction.id === inputId ? (
                                <input
                                    type='text'
                                    onChange={onChangeText}
                                    name='modifiedText'
                                    className={styles.text_input}
                                    placeholder='modify the instruction'
                                />
                            ) : (
                                <div className={styles.text_input}>{instruction.text}</div>
                            )}
                        </div>
                        <div className={styles.actions_container}>
                            {instruction.id === inputId ? (
                                <button
                                    onClick={() => handleEdits(instruction.id, 'instruction')}
                                    type='button'
                                    className={styles.save_button}
                                    placeholder='save instruction'
                                >
                                    {saveInput.src && (
                                        <Image src={saveInput.src} alt='delete icon' width={50} height={60} />
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        setData((prevState) => ({
                                            ...prevState,
                                            inputId: instruction.id,
                                            modifiedText: '',
                                        }))
                                    }
                                    className={styles.edit_button}
                                    type='button'
                                    placeholder='edit instruction'
                                >
                                    {editInput.src && (
                                        <Image src={editInput.src} alt='delete icon' width={50} height={60} />
                                    )}
                                </button>
                            )}
                            <button
                                onClick={() => deleteInputContainer(instruction.id, 'instruction')}
                                className={styles.delete_button}
                                type='button'
                                placeholder='delete instruction'
                            >
                                {deleteIcon.src && (
                                    <Image src={deleteIcon.src} alt='delete icon' width={50} height={60} />
                                )}
                            </button>
                        </div>
                    </div>
                </section>
            ))}
        </section>
    );

    const ingredientSection = () => (
        <section className={styles.ingredients_section}>
            <h1 className={styles.ingredients_title}>Ingredients</h1>
            <input
                type='text'
                placeholder='2 onions'
                onChange={onChangeText}
                value={ingredient}
                name='ingredient'
                className={styles.text_input}
            />
            <button
                onClick={() => addInputContainer('ingredient')}
                type='button'
                className={styles.add_ingredient}
                placeholder='add ingredient'
            >
                + Ingredients
            </button>
            {ingredientList.map((ingredient) => (
                <section
                    key={ingredient.id}
                    className={`${styles.new_ingredient_container} ${styles.input_and_actions_container} `}
                >
                    <div className={styles.input_container}>
                        {ingredient.id === inputId ? (
                            <input
                                type='text'
                                onChange={onChangeText}
                                name='modifiedText'
                                placeholder='modify the ingredient'
                                className={styles.text_input}
                            />
                        ) : (
                            <div className={styles.text_input}>{ingredient.text}</div>
                        )}
                    </div>
                    <div className={styles.actions_container}>
                        {ingredient.id === inputId ? (
                            <button
                                onClick={() => handleEdits(ingredient.id, 'ingredient')}
                                placeholder='save ingredient'
                                type='button'
                                className={styles.save_button}
                            >
                                {saveInput.src && (
                                    <Image src={saveInput.src} alt='delete icon' width={50} height={60} />
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    setData((prevState) => ({ ...prevState, inputId: ingredient.id, modifiedText: '' }))
                                }
                                className={styles.edit_button}
                                type='button'
                                placeholder='edit ingredient'
                            >
                                {editInput.src && (
                                    <Image src={editInput.src} alt='delete icon' width={50} height={60} />
                                )}
                            </button>
                        )}
                        <button
                            onClick={() => deleteInputContainer(ingredient.id, 'ingredient')}
                            className={styles.delete_button}
                            type='button'
                            placeholder='delete ingredient'
                        >
                            {deleteIcon.src && <Image src={deleteIcon.src} alt='delete icon' width={50} height={60} />}
                        </button>
                    </div>
                </section>
            ))}
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
