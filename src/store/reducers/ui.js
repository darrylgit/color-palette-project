import { 
	SET_KEY 
} from '../actions/actions';

const initialState = {
	isLoading:true
}

export const uiReducer = (state=initialState, action) => {
	switch(action.type){
		case SET_KEY:
			return Object.assign({}, state, {[action.key]:action.value});
		default:
			return state;
	}
}