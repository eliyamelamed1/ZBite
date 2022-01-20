import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GeneralForm from '../../forms/recipeCreate/GeneralForm';
import IngredientForm from '../../forms/recipeCreate/IngredientForm';
import InstructionForm from '../../forms/recipeCreate/InstructionForm';
import { RootState } from '../../redux/store';
import Router from 'next/router';
import UiSectionSeparator from '../../components/ui/UiSectionSeperator';
import { pageRoute } from '../../enums';
import { recipeCreateAction } from '../../redux/actions/recipeActions';
import styles from '../../styles/pages/recipeCreate.module.scss';
import { toast } from 'react-toastify';

interface StateTypes {
    photoMain: null | File;
    photoMainBlob: string;
    title: string;
    description: string;
    cookTime: string;
    serving: string;
    instructionList: any[];
    ingredientList: any[];

    instruction: string;
    ingredient: string;
    modifiedText: string;
    inputId: string;
}

const RecipeCreate = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<StateTypes>({
        // recipe fields
        photoMain: null,
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
    } = formData;

    const { isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);
    isUserAuthenticated === false ? Router.push(pageRoute().login) : null;
    // ------------Functions------------
    const onChangeText = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onChangeImage = async (e) => {
        try {
            setFormData((prevState) => ({ ...prevState, photoMain: e.target.files[0] as File }));
            const imageBlob = await URL.createObjectURL(e.target.files[0]);
            setFormData((prevState) => ({ ...prevState, [e.target.name]: imageBlob }));
        } catch {}
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const ingredientsTextList = ingredientList.map((ingredient) => ingredient.text);
            const instructionsTextList = instructionList.map((instruction) => instruction.text);

            if (ingredientsTextList.length === 0 || instructionsTextList.length === 0)
                return toast.error('ingredients / instructions is not allowed to be empty');

            dispatch(
                recipeCreateAction({
                    photoMain,
                    title,
                    description,
                    serving,
                    cookTime,
                    ingredientsTextList,
                    instructionsTextList,
                })
            );
        } catch (err) {
            // console.log(err);
        }
    };

    // ------------Sections-------------

    return (
        <div data-testid='recipeCreate' className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                {GeneralForm({ onChangeImage, photoMainBlob, onChangeText, title, description, cookTime, serving })}
                <UiSectionSeparator />
                {IngredientForm({ onChangeText, ingredient, setFormData, ingredientList, inputId, modifiedText })}
                <UiSectionSeparator />
                {InstructionForm({ onChangeText, instruction, setFormData, instructionList, inputId, modifiedText })}
                <UiSectionSeparator />
                <button type='submit' className={styles.create_button}>
                    Create Recipe
                </button>
            </form>
        </div>
    );
};

export default RecipeCreate;
