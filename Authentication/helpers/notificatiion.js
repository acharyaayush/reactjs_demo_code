import { message, notification } from 'antd';
import store from 'store';

//for success status code 200
export const successNotify = (msg) => {
	message.success(msg);
};

//for validation errors status code 201
export const errorNotify = (msg) => {
	message.error(msg);
};

//for Unauthenticated user status code 401
export const unauthenticatedNotify = (history) => {
	store.remove('hhr_token');
	notification.error({
		message: 'Session Expired',
		description: 'Your Session has been expired, Kindly Login again!!',
	});
	history.push('/signin-customer');
};

//for Internbal Server Error status code 500
export const internalErrorNotify = () => {
	notification.error({
		message: 'Something Went Wrong',
		description: 'Kindly try after some time',
	});
};
