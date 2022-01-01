// TODO - change PropTypes id to .isRequired
// test onSubmit dispatch actiob
// test form calls onSubmit

import React, { useState } from 'react';

import GeneralForm from '../../forms/recipes/GeneralForm';
import IngredientForm from '../../forms/recipes/IngredientForm';
import InstructionForm from '../../forms/recipes/InstructionForm';
import UiButton from '../ui/UiButton';
import UiPopUp from '../ui/UiPopUp';
import UiSectionSeparator from '../ui/UiSectionSeperator';
import { recipeUpdateAction } from '../../redux/actions/recipeActions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

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

const RecipeUpdate: React.FC<{ id: string }> = ({ id }) => {
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
    const [displayForm, setDisplayForm] = useState(false);

    const onChangeText = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onChangeImage = async (e) => {
        try {
            setFormData((prevState) => ({ ...prevState, photoMain: e.target.files[0] as File }));
            const imageBlob = await URL.createObjectURL(e.target.files[0]);
            setFormData((prevState) => ({ ...prevState, [e.target.name]: imageBlob }));
        } catch {}
    };
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            const ingredientsTextList = ingredientList.map((ingredient) => ingredient.text);
            const instructionsTextList = instructionList.map((instruction) => instruction.text);

            if (ingredientsTextList.length === 0 || instructionsTextList.length === 0)
                return toast.error('ingredients / instructions is not allowed to be empty');

            dispatch(
                recipeUpdateAction({
                    id,
                    photoMain,
                    title,
                    description,
                    serving,
                    cookTime,
                    ingredientsTextList,
                    instructionsTextList,
                })
            );
        } catch {}
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisplayForm(true);
    };
    const recipeUpdateSection = () => (
        <UiPopUp onSubmit={onSubmit} setDisplayForm={setDisplayForm}>
            <h1>Update Recipe</h1>
            {GeneralForm({ onChangeImage, photoMainBlob, onChangeText, title, description, cookTime, serving })}
            <UiSectionSeparator />
            {InstructionForm({ onChangeText, instruction, setFormData, instructionList, inputId, modifiedText })}
            <UiSectionSeparator />
            {IngredientForm({ onChangeText, ingredient, setFormData, ingredientList, inputId, modifiedText })}
            <UiSectionSeparator />
            <UiButton reverse={true}>Submit</UiButton>
        </UiPopUp>
    );

    return (
        <div data-testid='recipeUpdate'>
            <form onClick={(e) => handleSubmit(e)}>
                <UiButton reverse={true}>Update</UiButton>
            </form>
            {displayForm && recipeUpdateSection()}
        </div>
    );
};

export default RecipeUpdate;
