interface DataTypes {
    value: string;
    setData: (prevState) => {};
    instruction: string;
    ingredient: string;
    instructionList: Object[];
    ingredientList: Object[];
}

const addInputContainer: (DataTypes) => void = ({
    value,
    setData,

    instruction = '',
    ingredient = '',

    instructionList = [],
    ingredientList = [],
}) => {
    if (value === 'instruction') {
        if (instruction === '') return;

        const newInstruction = {
            id: new Date().getTime(),
            text: instruction,
            imageBlob: null,
            imageFile: null,
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
