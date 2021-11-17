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
        instructionList: [],
        instruction: '',
    });
    const { title, description, flavor_type, cook_time, serving, recipe_image, instructionList, instruction } = data;

    const { isUserAuthenticated } = useSelector((state) => state.userReducer);
    isUserAuthenticated === false ? Router.push(pageRoute().home) : null;

    const onChangeText = (e) => setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    const onChangeImage = (e) => {
        try {
            const imageSrc = URL.createObjectURL(e.target.files[0]);
            setData((prevState) => ({ ...prevState, [e.target.name]: imageSrc }));
        } catch {}
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(recipeCreateAction({ title, description, flavor_type }));
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
    // -------new code
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState('');

    const instructionSection = () => (
        <section id='instruction-list' className={styles.instructions_section}>
            <h1 className={styles.instructions_title}>Instructions</h1>
            <input
                type='text'
                onChange={onChangeText}
                value={instruction}
                name='instruction'
                className={styles.instruction_input}
            />
            <button onClick={addInputContainer} type='button' className={styles.add_instruction}>
                + Instruction
            </button>
            {instructionList.map((instruction) => (
                <section key={instruction.id} className={styles.new_instruction}>
                    <div className={styles.new_instruction}>
                        {instruction.id === todoEditing ? (
                            <input
                                type='text'
                                onChange={(e) => setEditingText(e.target.value)}
                                className={styles.instruction_input}
                            />
                        ) : (
                            <div className={styles.instruction_input}>{instruction.text}</div>
                        )}
                    </div>
                    <div className={styles.instructions_actions}>
                        {instruction.id === todoEditing ? (
                            <button
                                onClick={() => handleEdits(instruction.id)}
                                type='button'
                                className={styles.save_button}
                            >
                                {saveInput.src && (
                                    <Image src={saveInput.src} alt='delete icon' width={50} height={60} />
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={() => setTodoEditing(instruction.id)}
                                className={styles.edit_button}
                                type='button'
                            >
                                {editInput.src && (
                                    <Image src={editInput.src} alt='delete icon' width={50} height={60} />
                                )}
                            </button>
                        )}
                        <button
                            onClick={() => deleteContainer(instruction.id)}
                            className={styles.delete_button}
                            type='button'
                        >
                            {deleteIcon.src && <Image src={deleteIcon.src} alt='delete icon' width={50} height={60} />}
                        </button>
                    </div>
                </section>
            ))}
        </section>
    );

    function addInputContainer(e) {
        if (instruction == '') return;
        const newInstruction = {
            id: new Date().getTime(),
            text: instruction,
        };
        const newInstructionList = instructionList.concat(newInstruction);

        setData((prevState) => ({ ...prevState, instructionList: newInstructionList }));
        setData((prevState) => ({ ...prevState, instruction: '' }));
    }

    function deleteContainer(id) {
        let updatedInstructionList = [...instructionList].filter((instruction) => instruction.id !== id);

        setData((prevState) => ({ ...prevState, instructionList: updatedInstructionList }));
    }

    function handleEdits(id) {
        if (editingText === '') return;

        const updatedInstructionList = [...instructionList].map((instruction) => {
            if (instruction.id === id) {
                instruction.text = editingText;
            }

            return instruction;
        });

        setData((prevState) => ({ ...prevState, instructionList: updatedInstructionList }));
        setTodoEditing(null);
    }
    return (
        <div data-testid='recipeCreate' className={styles.container}>
            <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
                {generalSection()}
                <hr className={styles.section_separator} />
                {instructionSection()}
                <hr className={styles.section_separator} />
                <button type='submit' className={styles.create_button}>
                    Create Recipe
                </button>
            </form>
        </div>
    );
};

export default RecipeCreate;
