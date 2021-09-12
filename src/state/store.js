import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk"
import memberReducer from './memberReducer'

const reducers = combineReducers({
	member: memberReducer
})

export const store = createStore(reducers, {},applyMiddleware(thunk))