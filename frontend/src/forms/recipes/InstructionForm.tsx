import EditInputContainer from '../../components/utils/ModifyInputContainer';
import Image from 'next/image';
import React from 'react';
import addInputContainer from '../../components/utils/AddInputContainer';
import deleteIcon from '../../styles/icons/delete-input-icon.svg';
import deleteInputContainer from '../../components/utils/DeleteInputContainer';
import editInput from '../../styles/icons/edit_input.svg';
import saveInput from '../../styles/icons/save_changes.svg';
import styles from '../../styles/pages/recipeCreate.module.scss';

const InstructionForm = ({ onChangeText, instruction, setFormData, instructionList, inputId, modifiedText }) => (
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
            onClick={() => addInputContainer({ value: 'instruction', setFormData, instruction, instructionList })}
            type='button'
            className={styles.add_instruction}
            placeholder='add instruction'
        >
            + Instruction
        </button>
        {instructionList.map((instruction) => (
            <section key={instruction.id} className={styles.new_instruction_container}>
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
                                        setFormData,
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
                                    setFormData((prevState) => ({
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
                                    setFormData,
                                })
                            }
                            className={styles.delete_button}
                            type='button'
                            placeholder='delete instruction'
                        >
                            {deleteIcon.src && <Image src={deleteIcon.src} alt='delete icon' width={50} height={60} />}
                        </button>
                    </div>
                </div>
            </section>
        ))}
    </section>
);

export default InstructionForm;
