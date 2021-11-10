/* eslint-disable */
import { Box, Button, Alert } from '@material-ui/core';
import { useDishState, useDishDispatch } from '../../context/dishAppContext';
import { AddOrdre } from '../../services/DishServices';
import _ from 'loadsh';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OrdreListToolbar = (props) => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState({});
  const [failedOrder, setFailedOrder] = useState({});
  const {
    state: { cart }
  } = useDishState();
  const dispatch = useDishDispatch();

  const TotalPrice = cart.dishes
    .map(({ price, quantity }) => {
      return price * quantity;
    })
    .reduce((curNumber, item) => {
      return Number(curNumber) + Number(item);
    }, 0);
  const onAddOrdre = async () => {
    setIsLoading(true);
    const { Info = [] } = await AddOrdre(cart.dishes);
    const { Ordred = {}, notOrdred = {} } = _.groupBy(Info, 'status');
    console.log(Ordred, notOrdred);
    setSuccessOrder(Ordred);
    setFailedOrder(notOrdred);
    setTimeout(() => {
      setIsLoading(false);
      Navigate('/all-dishes');
    }, 6000);
  };

  console.log(cart.dishes);
  return (
    <>
      {!_.isEmpty(failedOrder) && (
        <Alert severity="error">
          {failedOrder.map(({ dish }) => dish).join(', ')}{' '}
          {failedOrder.length > 1 ? 'are not Ordred' : 'is not Ordred'}
        </Alert>
      )}
      {!_.isEmpty(successOrder) && (
        <Alert severity="success">
          {successOrder.map(({ dish }) => dish).join(', ')}{' '}
          {successOrder.length > 1 ? 'are Ordred' : 'is Ordred'}
        </Alert>
      )}
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            color="primary"
            variant="contained"
            disabled={(cart.dishes.length > 0 ? false : true) || isLoading}
            onClick={onAddOrdre}
          >
            Order Now {TotalPrice} €
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OrdreListToolbar;
