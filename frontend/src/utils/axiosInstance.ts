import axios from 'axios';
import { setLoadingAction } from '../redux/actions/loadingActions';
import store from '../redux/store';
import { toast } from 'react-toastify';

//  need to switch to cookie from localStorage

const auth_token = typeof window !== 'undefined' && localStorage.getItem('auth_token');

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000', need to learn how to mock for tests
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

if (auth_token) axiosInstance.defaults.headers.common.Authorization = `Token ${auth_token}`;

axiosInstance.interceptors.request.use(
    (config) => {
        // trigger 'loading=true' event here
        toast.error(0);
        store.dispatch(setLoadingAction(true));

        return config;
    },
    (error) => {
        store.dispatch(setLoadingAction(false));
        toast.error('1');

        throw error;
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        toast.error('2');

        store.dispatch(setLoadingAction(false));
        return response;
    },
    (error) => {
        toast.error(3);
        toast.error(error);
        toast.error({ error });

        store.dispatch(setLoadingAction(false));

        const object = error.response.data;
        if (object) {
            const key = Object.keys(object)[0];
            let errorMassage = object[key];
            if (Array.isArray(errorMassage)) {
                toast.error(errorMassage[0]);
            } else {
                toast.error(errorMassage);
            }
        }
        throw error;
    }
);

export default axiosInstance;
