import axios from 'axios';
import { toast } from 'react-toastify';

//  need to switch to cookie from localStorage

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000', need to learn how to mock for tests
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: typeof window !== 'undefined' && `Token ${localStorage.getItem('auth_token')}`,
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
            const errorMassage = object[key][0];
            toast.error(errorMassage);
        }
        throw new Error(error);
    }
);

export default axiosInstance;
