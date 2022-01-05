import axios from 'axios';
import store from '../../redux/store';
import { toast } from 'react-toastify';

//  need to switch to cookie from localStorage

const { auth_token } = store.getState().userReducer;

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000', need to learn how to mock for tests
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: auth_token ? `Token ${auth_token}` : null,
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
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
        throw new Error(error);
    }
);

export default axiosInstance;
