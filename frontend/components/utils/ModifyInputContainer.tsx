const EditInputContainer = ({ id, value, setData, modifiedText, ingredientList = [], instructionList = [] }) => {
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

export default EditInputContainer;
