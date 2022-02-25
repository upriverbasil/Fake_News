import { combineReducers } from "redux";
import fakeNews from './fakeNews'
import auth from "./auth";

export default combineReducers({
    fakeNews,auth
})