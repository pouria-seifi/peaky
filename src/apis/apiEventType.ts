import baseApi, { instanceAxios } from './baseApi';

export const apiGetAllEventTypes = (data) => {
    return instanceAxios({ ...baseApi.getAllEventTypes(), data })
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
};

export const apiDeleteEventType = (data) => {
    return instanceAxios({ ...baseApi.deleteEventType(), data })
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
};

export const apiCreateEventType = (data) => {
    return instanceAxios({ ...baseApi.createEventType(), data })
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
};

export const apiEditEventType = (data) => {
    return instanceAxios({ ...baseApi.editEventType(), data })
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
};