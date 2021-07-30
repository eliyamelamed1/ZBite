import { TEST_CASE_AUTH } from '../types';

const initialState = {
    listOfRecipes: null,
    listOfSearchedRecipes: null,
    recipeDetails: null,
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEST_CASE_AUTH:
            return {
                ...state,
            };

        default:
            return state;
    }
}
