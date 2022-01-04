import axios from 'axios';
import { toast } from 'react-toastify';

//  need to switch to cookie from localStorage

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000', need to learn how to mock for tests
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization:
            typeof window !== 'undefined' && localStorage.getItem('auth_token')
                ? `Token ${localStorage.getItem('auth_token')}`
                : null,
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // toast.error(error.response.data.detail);

        const object = error.response.data;
        if (object) {
            const key = Object.keys(object)[0];
            let errorMassage = object[key];
            let a;
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
