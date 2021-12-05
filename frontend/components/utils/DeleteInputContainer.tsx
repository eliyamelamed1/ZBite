const deleteInputContainer = ({ id, value, setData, instructionList = [], ingredientList = [] }) => {
    if (value === 'instruction') {
        let updatedInstructionList = [...instructionList].filter((instruction) => instruction.id !== id);
        setData((prevState) => ({ ...prevState, instructionList: updatedInstructionList }));
    }
    if (value === 'ingredient') {
        let updatedIngredientList = [...ingredientList].filter((ingredient) => ingredient.id !== id);
        setData((prevState) => ({ ...prevState, ingredientList: updatedIngredientList }));
    }
};
export default deleteInputContainer;
