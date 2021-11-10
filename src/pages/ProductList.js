/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination,
  CircularProgress
} from '@material-ui/core';
import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/DishCard/DishCard';
import products from '../__mocks__/products';
import { getAllDish } from 'src/services/DishServices';
import moment from 'moment';

const ProductList = () => {
  const [allDishes, setAllDishes] = useState([]);
  const [isfiltred, setIsFiltred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState({ search: '' });

  const getDishes = async () => {
    setLoading(true);
    const allDishes = await getAllDish();
    const All = allDishes?.map(({ availbility }) => {
      const availble = availbility.map(({ availbilityTime }) => {
        const startTime = new Date().setHours(availbilityTime.start, 0, 0);
        const endTime = new Date().setHours(availbilityTime.end, 0, 0);
        const date = new Date();
        return moment(date).isBetween(startTime, endTime);
      });
      return {
        available: availble.some((el) => el === true),
        availbilities: availbility
      };
    });
    const AllDish = allDishes?.map((dish, index) => {
      dish.availbility = All[index];
      return dish;
    });
    setLoading(false);
    setAllDishes(AllDish.reverse());
  };

  useEffect(async () => {
    await getDishes();
  }, []);
  const FilterChangeHandler = async (value) => {
    if (value.trim().length > 0) setIsFiltred(true);
    else setIsFiltred(false);

    setText({ search: value });
  };
  const regex = new RegExp(text.search, 'i');

  return (
    <>
      <Helmet>
        <title>Dishes | Pages </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 2
        }}
      >
        {' '}
        {loading ? (
          <Box sx={{ placeContent: 'center', display: 'flex', margin: '10%' }}>
            <CircularProgress />
          </Box>
        ) : allDishes?.length > 0 ? (
          <Container maxWidth={false} justifyContent="center">
            <ProductListToolbar filtredChange={FilterChangeHandler} />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {isfiltred
                  ? allDishes
                      .filter((dish) => regex.test(dish.name))
                      .map((products) => (
                        <Grid item key={products._id} lg={4} md={6} xs={12}>
                          <ProductCard product={products} />
                        </Grid>
                      ))
                  : allDishes.map((products) => (
                      <Grid item key={products._id} lg={4} md={6} xs={12}>
                        <ProductCard product={products} />
                      </Grid>
                    ))}
              </Grid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 3
              }}
            ></Box>
          </Container>
        ) : (
          <h1 style={{ padding: '10%', textAlign: 'center' }}>
            {' '}
            No dishes Found
          </h1>
        )}
      </Box>
    </>
  );
};

export default ProductList;
