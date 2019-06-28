import {
	SET_KEY
} from './actions';


export const setKey = (key, value) => {
	return {
		type:SET_KEY,
		key:key,
		value:value
	}
}