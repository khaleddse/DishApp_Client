/* eslint-disable */

import React, { createContext, useReducer, useContext } from 'react';

import {
  ADD_DISH,
  INCREMENT_DISH,
  DECREMENT_DISH,
  CALCULATIOTOTALPRICE
} from './actionTypes';

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

const dishReducer = (state, action) => {
  switch (action.type) {
    case ADD_DISH: {
      return updateObject(state, {
        cart: { ...state.cart, dishes: state.cart.dishes.concat(action.dish) }
      });
    }
    case INCREMENT_DISH: {
      const updatedDish =
        state.cart.dishes.find(({ _id }) => _id === action.dishId) || {};

      const oldDishes = state.cart.dishes.filter(
        ({ _id }) => _id !== action.dishId
      );
      return updateObject(state, {
        cart: {
          ...state.cart,
          dishes: oldDishes.concat({
            ...updatedDish,
            quantity: updatedDish.quantity + 1
          })
        }
      });
    }
    case DECREMENT_DISH: {
      const updatedDish =
        state.cart.dishes.find(({ _id }) => _id === action.dishId) || {};

      const oldDishes = state.cart.dishes.filter(
        ({ _id }) => _id !== action.dishId
      );

      if (updatedDish.quantity - 1 > 0) {
        oldDishes.push({
          ...updatedDish,
          quantity: updatedDish.quantity - 1
        });
      }

      return updateObject(state, {
        cart: {
          ...state.cart,
          dishes: oldDishes
        }
      });
    }
    case CALCULATIOTOTALPRICE: {
      return updateObject(state, {
        cart: { ...state.cart, TotalPrice: action.totalPrice }
      });
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const DishStateContext = createContext();
const DishDispatchContext = createContext();

function DishProvider({ children, onSubmitWizard }) {
  const [state, dispatch] = useReducer(dishReducer, {
    cart: { dishes: [] }
  });

  return (
    <DishStateContext.Provider value={{ state }}>
      <DishDispatchContext.Provider value={dispatch}>
        {children}
      </DishDispatchContext.Provider>
    </DishStateContext.Provider>
  );
}

function useDishState() {
  const context = useContext(DishStateContext);
  if (context === undefined) {
    throw new Error('DishStateContext must be used within a DishProvider');
  }
  return context;
}

function useDishDispatch() {
  const context = useContext(DishDispatchContext);
  if (context === undefined) {
    throw new Error('DishDispatchContext must be used within a DishProvider');
  }
  return context;
}

export { DishProvider, useDishState, useDishDispatch };
