import axios from 'axios';

const instance = axios.create({
	baseURL: 'YOUR BASE URL',
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance;
