import baseApi, { instanceAxios } from './baseApi';

export const apiRegister = (data) => {
    return instanceAxios({ ...baseApi.register(), data })
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
};

export const apiLogin = (data) => {
    return instanceAxios({ ...baseApi.login(), data })
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
};