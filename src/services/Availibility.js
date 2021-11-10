/* eslint-disable */
import api from '../config/base';

export const getAllAvailibility = async () => {
  try {
    const { data } = await api.get('/availibility/');
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const FindAvById = (id) => {
  api
    .post(`/availibility/${id}`)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });
};
