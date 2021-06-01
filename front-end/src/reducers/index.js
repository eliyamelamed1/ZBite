import { combineReducers } from "redux";
import authReducer from "./auth";
import recipeReducer from "./recipe";
import socketReducer from "./socket";

export default combineReducers({
  authReducer,
  recipeReducer,
  socketReducer,
});
