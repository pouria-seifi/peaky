import baseApi, { instanceAxios } from './baseApi';

export const apiGetReserveEventData = (data) => {
    return instanceAxios({ ...baseApi.getReserveEventData(), data })
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
};

export const apiPostReserveEventData = (data) => {
    return instanceAxios({ ...baseApi.postReserveEventData(), data })
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
};

export const apiGetReservedEvents = (data) => {
    return instanceAxios({ ...baseApi.getReservedEvents(), data })
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
};