interface DataTypes {
    id: string;
    value: string;
    setFormData: (prevState) => {};
    instructionList: Object[];
    ingredientList: Object[];
}

const deleteInputContainer: (DataTypes) => void = ({
    id,
    value,
    setFormData,
    instructionList = [],
    ingredientList = [],
}) => {
    if (value === 'instruction') {
        let updatedInstructionList = [...instructionList].filter((instruction) => instruction.id !== id);
        setFormData((prevState) => ({ ...prevState, instructionList: updatedInstructionList }));
    }
    if (value === 'ingredient') {
        let updatedIngredientList = [...ingredientList].filter((ingredient) => ingredient.id !== id);
        setFormData((prevState) => ({ ...prevState, ingredientList: updatedIngredientList }));
    }
};
export default deleteInputContainer;
