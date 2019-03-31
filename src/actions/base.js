import axios from 'axios';
import endpoints from 'config/api/endpoints';
import dtoMapping from 'data/mapping';
import {
	tokenInfo
} from 'data/selectors/auth';
import {
	removeLocalAuthToken
} from 'data/services/auth';
import {
	AUTH
} from './index';

axios.defaults.withCredentials = true;


export let request = axios.create({
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	},
	withCredentials: false,
	validateStatus: false
});

export const dtoMapper = {
	resolve: interfaceName => dtoMapping.resolver.resolve(interfaceName),
	interfaces: dtoMapping.interfaces
};

export let extendRequest = axios;
export const isResponseValid = response => response.status === 200;
export const ENDPOINTS = endpoints;

export const toSimpleResponse = response => {
	var data = response.data;
	if (typeof data === "undefined")
		data = {};

	data.status = response.status;
	return data;
};

export const withAuth = (iRequest, state) => {
	let headers = iRequest.defaults.headers.common;
	const authInfo = tokenInfo(state);
	if (!authInfo)
		return;

	headers['Authorization'] = `Bearer ${authInfo.access_token}`;

	return iRequest;
};


export const execApiAction = (dto, state, dispatch) => {	
	return withAuth(request, state)
		.post(ENDPOINTS.actions.execute, dto)
		.then(response => {
			const authInfo = tokenInfo(state);
			if (response.status === 401 && !authInfo.refreshing) {
				dispatch({
					type: AUTH.SIGN_OUT
				});
			}

			return response;
		});
};
