import { combineReducers } from "redux";
import authReducer from "./auth";
import recipeReducer from "./recipe";
import socketReducer from "./socket";
import chatReducer from "./chat";

export default combineReducers({
  authReducer,
  recipeReducer,
  socketReducer,
  chatReducer,
});
