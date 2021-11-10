/* eslint-disable */
import api from '../config/base';

export const getAllCateg = async () => {
  try {
    const { data } = await api.get('/categ/');
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const FindCategById = (id) => {
  api
    .post(`/categ/${id}`)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });
};
