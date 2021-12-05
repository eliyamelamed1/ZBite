const addInputContainer = ({
    value,
    setData,

    instruction = '',
    instructionList = [],
    ingredient = '',
    ingredientList = [],
}) => {
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

export default addInputContainer;
