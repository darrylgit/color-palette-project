import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { uiReducer, dataReducer } from './reducers/index';

const rootReducer = combineReducers({
	ui:uiReducer,
	data:dataReducer
});

const configureStore = () => {
	return createStore(rootReducer, {}, applyMiddleware(reduxThunk))
}

export default configureStore;