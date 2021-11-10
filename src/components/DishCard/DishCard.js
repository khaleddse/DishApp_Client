/* eslint-disable */
import { useContext, useState } from 'react';
import { useDishState, useDishDispatch } from '../../context/dishAppContext';

import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

import AvailabilityIcon from '../../assets/available.png';
import OutOfOrderIcon from '../../assets/out-of-stock.png';

import {
  Clock as ClockIcon,
  BookOpen as BookOpenIcon,
  Coffee as CoffeeIcon,
  Users as UsersIcon
} from 'react-feather';

import {
  Button,
  IconButton,
  styled,
  Typography,
  Avatar,
  Collapse,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  Tooltip,
  ButtonGroup
} from '@material-ui/core';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function RecipeReviewCard({ product }) {
  const {
    state: { cart }
  } = useDishState();
  const dispatch = useDishDispatch();

  const {
    _id = '',
    image = '',
    name = '',
    createdAt = '',
    description = '',
    preparitionTime = '',
    persons = '',
    availbility = []
  } = product;
  const addProductToCartHandler = () => {
    dispatch({ type: 'ADD_DISH', dish: { ...product, quantity: 1 } });
  };

  const incrementCartHandler = () => {
    dispatch({ type: 'INCREMENT_DISH', dishId: _id });
  };

  const decrementCartHandler = () => {
    dispatch({ type: 'DECREMENT_DISH', dishId: _id });
  };

  const currentDish = cart.dishes.find((dish) => dish._id === _id);

  const isInCart = cart.dishes.find((dish) => dish._id === _id);
  console.log(cart);
  return (
    <Card>
      <CardHeader
        action={
          <img
            src={availbility.available ? AvailabilityIcon : OutOfOrderIcon}
            style={{ height: '50px' }}
          />
        }
        title={name}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <div style={{ display: 'flex', minHeight: '20px' }}>
          {availbility.length > 0 ? (
            <>
              <Tooltip title="preparation time">
                <ClockIcon
                  style={{ height: '20px', width: '20px', marginRight: '8px' }}
                />
              </Tooltip>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                {availability.availabilities
                  .map(({ label }) => label)
                  .join(', ')}
              </Typography>
            </>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '10px'
          }}
        >
          <Tooltip title="Description">
            <BookOpenIcon
              style={{
                height: '20px',
                width: '27px',
                marginRight: '8px',
                alignSelf: 'flex-start'
              }}
            />
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '10px'
          }}
        >
          <Tooltip title="Preparition Time">
            <CoffeeIcon
              style={{
                height: '20px',
                width: '20px',
                marginRight: '8px',
                alignSelf: 'flex-start'
              }}
            />
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            {preparitionTime} minutes
          </Typography>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '10px'
          }}
        >
          <Tooltip title="can be eaten by">
            <UsersIcon
              style={{
                height: '20px',
                width: '20px',
                marginRight: '8px',
                alignSelf: 'flex-start'
              }}
            />
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            {persons} {persons > 1 ? 'persons' : 'person'}
          </Typography>
        </div>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        {isInCart ? (
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={decrementCartHandler} variant="contained">
              -
            </Button>
            <Button disabled variant="contained">
              {currentDish.quantity}
            </Button>
            <Button onClick={incrementCartHandler} variant="contained">
              +
            </Button>
          </ButtonGroup>
        ) : (
          //disabled={!availbility.available}
          <Button
            variant="contained"
            endIcon={<AddShoppingCart />}
            style={{ textTransform: 'none' }}
            onClick={addProductToCartHandler}
          >
            add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
