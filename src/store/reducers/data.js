import {
	SET_DATA
} from '../actions/actions';

const initialState = {
	initialColors:[],
	selectedColors:[],
	randomColors:[]
}

export const dataReducer = (state=initialState, action) => {
	switch(action.type){
		case SET_DATA:
			return Object.assign({}, state, {[action.key]:action.value});
		default:
			return state;
	}
}