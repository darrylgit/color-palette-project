import {
	SET_DATA
} from './actions';

export const setData = (key, value) => {
	return {
		type:SET_DATA,
		key:key,
		value:value
	}
}