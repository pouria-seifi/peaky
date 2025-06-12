import axios from 'axios';
import { tokenCheckExists } from '../components/functions';

export const instanceAxios = axios.create();

const baseApi = {
    register: () => ({
        url: `/register`,
        method: 'POST',
    }),

    login: () => ({
        url: `/login`,
        method: 'POST',
    }),

    createEventType: () => ({
        url: `/createEventType`,
        method: 'POST',
    }),

    getAllEventTypes: () => ({
        url: `/getAllEventTypes`,
        method: 'GET',
    }),

    deleteEventType: () => ({
        url: `/deleteEventType`,
        method: 'DELETE',
    }),

    editEventType: () => ({
        url: `/editEventType`,
        method: 'PUT',
    }),

    getReserveEventData: () => ({
        url: `/getReserveEventData`,
        method: 'POST',
    }),

    postReserveEventData: () => ({
        url: `/reserveEvent`,
        method: 'POST',
    }),

    getReservedEvents: () => ({
        url: `/getReservedEvents`,
        method: 'GET',
    }),
}

// Request interceptor for API calls
instanceAxios.interceptors.request.use(
    async config => {
        config.baseURL = process.env.API_URL
        config.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `${tokenCheckExists()}`,
            "app-name": "Peaky",
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });


export default baseApi