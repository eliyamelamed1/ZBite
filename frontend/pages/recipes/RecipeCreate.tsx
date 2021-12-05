import React, { useState } from 'react';
import { ingredientCreateAction, instructionCreateAction, recipeCreateAction } from '../../redux/actions/recipeActions';
import { useDispatch, useSelector } from 'react-redux';

import EditInputContainer from '../../components/utils/ModifyInputContainer';
import Image from 'next/image';
import Router from 'next/router';
import addInputContainer from '../../components/utils/AddInputContainer';
import deleteIcon from '../../styles/icons/delete-input-icon.svg';
import deleteInputContainer from '../../components/utils/DeleteInputContainer';
import editInput from '../../styles/icons/edit_input.svg';
import { pageRoute } from '../../globals';
import saveInput from '../../styles/icons/save_changes.svg';
import styles from '../../styles/pages/recipeCreate.module.scss';
import uploadImageIcon from '../../styles/icons/upload_image.svg';

const RecipeCreate = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        // recipe fields
        photoMain: '',
        photoMainBlob: '',
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
        photoMain,
        photoMainBlob,
        title,
        description,
        cookTime,
        serving,
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
            const imageFile = e.target.files[0];
            setData((prevState) => ({ ...prevState, photoMain: e.target.files[0] }));
            const imageBlob = await URL.createObjectURL(e.target.files[0]);
            setData((prevState) => ({ ...prevState, [e.target.name]: imageBlob }));
            return { imageBlob, imageFile };
        } catch {}
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // TODO redirect only on dispatch success
        const createRecipe = async () => {
            const ingredientsTextList = ingredientList.map((ingredient) => ingredient.text);
            const instructionsTextList = instructionList.map((instruction) => instruction.text);
            const instructionsImageList = instructionList.map((instruction) => instruction.imageFile);
            await dispatch(
                recipeCreateAction({
                    photoMain,
                    title,
                    description,
                    cookTime,
                    serving,
                    ingredientsTextList,
                    instructionsTextList,
                    instructionsImageList,
                })
            );
        };
        try {
            await createRecipe();
            Router.push(pageRoute().home);
        } catch (err) {
            // console.log(err);
        }
    };

    const saveInstructionImage = async (e, id) => {
        const { imageBlob, imageFile } = await onChangeImage(e);
        const updatedInstructionList = await [...instructionList].map((instruction) => {
            if (instruction.id === id) {
                instruction.imageBlob = imageBlob;
                instruction.imageFile = imageFile;
            }
            return instruction;
        });

        setData((prevState) => ({ ...prevState, instructionList: updatedInstructionList }));
    };

    // ------------Sections-------------
    const generalSection = () => (
        <section className={styles.general_section}>
            <input
                id='photoMainBlob'
                type='file'
                placeholder='image'
                name='photoMainBlob'
                onChange={onChangeImage}
                className={styles.image_input}
                accept='image/*'
            />
            <label htmlFor='photoMainBlob' className={styles.image_label}>
                {photoMainBlob ? (
                    <img src={photoMainBlob} />
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
                onClick={() => addInputContainer({ value: 'instruction', setData, instruction, instructionList })}
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
                            {instruction.imageBlob ? (
                                <img src={instruction.imageBlob} className={styles.uploaded_image} />
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
                                    onClick={() =>
                                        EditInputContainer({
                                            id: instruction.id,
                                            value: 'instruction',
                                            setData,
                                            modifiedText,
                                            instructionList,
                                        })
                                    }
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
                                onClick={() =>
                                    deleteInputContainer({
                                        id: instruction.id,
                                        value: 'instruction',
                                        instructionList,
                                        setData,
                                    })
                                }
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
                onClick={() => addInputContainer({ value: 'ingredient', setData, ingredient, ingredientList })}
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
                                onClick={() =>
                                    EditInputContainer({
                                        id: ingredient.id,
                                        value: 'ingredient',
                                        modifiedText,
                                        setData,
                                        ingredientList,
                                    })
                                }
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
                            onClick={() =>
                                deleteInputContainer({
                                    id: ingredient.id,
                                    value: 'ingredient',
                                    ingredientList,
                                    setData,
                                })
                            }
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
