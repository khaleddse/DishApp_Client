/* eslint-disable */
import api from '../config/base';

export const getAllDish = async () => {
  try {
    const { data } = await api.get('/dish');
    return data;
  } catch (err) {
    console.error(err.message)
  }
};
export const AddOrdre = async (OrdreData) => {
  try {
    const { data } = await api.post('/dish/ordre',OrdreData);
    return data;
  } catch (err) {
    console.error(err.message)
  }
};
export const addDish = async (DishData) => {
  try {
    console.log(DishData)
    const { data } = await api.post('/dish/add/', DishData);
    return data;
  } catch (err) {
    console.error(err.message)
  }
};

export const FindDishByCateg = (CategName) => {
  api
    .post('/dish/findByCateg', CategName)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });
};

export const FindDishById = (id) => {
  api
    .post(`/dish/${id}`)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });
};
