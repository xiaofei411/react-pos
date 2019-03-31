import {
	combineReducers
} from 'redux';
import {
	reducer as formReducer
} from 'redux-form';

export default combineReducers({
	form: formReducer,
	modal: require('./modal').default,
	cashedData: require('./cashedData').default,
	window: require('./window').default,
	auth: require('./auth').default,
	currentPlayer: require('./currentPlayer').default,
	players: require('./players').default,
	currentEmployee: require('./currentEmployee').default,
	employees: require('./employees').default,
});