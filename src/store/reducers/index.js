import { combineReducers } from "redux";
import litecoinReducer from "./litecoinReducer";

export default combineReducers({
  litecoin: litecoinReducer,
});
