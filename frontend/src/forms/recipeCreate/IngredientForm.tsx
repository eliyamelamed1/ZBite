import EditInputContainer from '../../utils/ModifyInputContainer';
import Image from 'next/image';
import React from 'react';
import addInputContainer from '../../utils/AddInputContainer';
import deleteIcon from '../../styles/icons/delete-input-icon.svg';
import deleteInputContainer from '../../utils/DeleteInputContainer';
import editInput from '../../styles/icons/edit_input.svg';
import saveInput from '../../styles/icons/save_changes.svg';
import styles from '../../styles/pages/recipeCreate.module.scss';

const IngredientForm = ({ onChangeText, ingredient, setFormData, ingredientList, inputId, modifiedText }) => (
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
            onClick={() => addInputContainer({ value: 'ingredient', setFormData, ingredient, ingredientList })}
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
                                    setFormData,
                                    ingredientList,
                                })
                            }
                            placeholder='save ingredient'
                            type='button'
                            className={styles.save_button}
                        >
                            {saveInput.src && <Image src={saveInput.src} alt='delete icon' width={50} height={60} />}
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    inputId: ingredient.id,
                                    modifiedText: '',
                                }))
                            }
                            className={styles.edit_button}
                            type='button'
                            placeholder='edit ingredient'
                        >
                            {editInput.src && <Image src={editInput.src} alt='delete icon' width={50} height={60} />}
                        </button>
                    )}
                    <button
                        onClick={() =>
                            deleteInputContainer({
                                id: ingredient.id,
                                value: 'ingredient',
                                ingredientList,
                                setFormData,
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
export default IngredientForm;
