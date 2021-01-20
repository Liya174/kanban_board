import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { headerReducer } from "./header-reducer";

const reducers = combineReducers({
    tasks: tasksReducer,
    header: headerReducer,
});

const store = createStore(reducers);

export default store;
