import authReducer from './reducers/auth';
import { combineReducers } from 'redux';
import recipeReducer from './reducers/recipe';

export default combineReducers({
    authReducer,
    recipeReducer,
});
