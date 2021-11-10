/* eslint-disable */

import { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import validate from 'validate.js';
import ImageUploader from 'react-images-upload';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Alert
} from '@material-ui/core';
import { getAllAvailibility } from '../services/Availibility';
import { getAllCateg } from '../services/CategService';
import { addDish } from '../services/DishServices';
import newDishSchema from '../schema/newDishSchema';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const NewDish = () => {
  const [failedCreation, setFailedCreation] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: '',
      description: '',
      price: '',
      category: '',
      availability: [],
      persons: '',
      preparitionTime: 0,
      quantity: 0,
      image: ''
    },
    touched: {},
    errors: null
  });

  const navigate = useNavigate();

  const getAllServices = async () => {
    const Availibilities = await getAllAvailibility();
    const CategData = await getAllCateg();
    setAvailabilities(Availibilities);
    setCategories(CategData);
  };
  useEffect(() => {
    getAllServices();
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, newDishSchema);
    setFormState((oldFormState) => ({
      ...oldFormState,
      isValid: isEmpty(errors),
      errors: errors || {}
    }));
  }, [formState.values]);

  const onChangeHandler = (event) => {
    if (event.persist) {
      event.persist();
    }
    setFormState((oldFormState) => ({
      ...oldFormState,
      values: {
        ...oldFormState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...oldFormState.touched,
        [event.target.name]: true
      }
    }));
  };
  const submitFormHandler = async (e) => {
    e.preventDefault();
    const SelectedData = {
      ...formState.values,
      availability: formState.values.availability.map(({ _id }) => ({
        availbilityTime: _id
      }))
    };
    console.log(SelectedData);
    const data = await addDish(SelectedData);
    if (data) {
      navigate('/all-dishes');
    } else {
      setFailedCreation(true);
      setTimeout(() => {
        setFailedCreation(false);
      }, 3000);
    }
  };
  const hasError = (field) => {
    if (formState.touched[field] && formState.errors[field]) {
      return true;
    }
    return false;
  };

  return (
    <>
      {failedCreation && (
        <Alert severity="error">Failed To Add A new dish— check it out!</Alert>
      )}

      <title>Add New Dish</title>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingTop: '100px'
        }}
      >
        <Container maxWidth="sm">
          <Typography color="textPrimary" variant="h1" align="center">
            Add New Dish
          </Typography>
          <TextField
            fullWidth
            label="Dish Name"
            margin="normal"
            name="name"
            variant="outlined"
            error={hasError('name')}
            helperText={hasError('name') ? formState.errors.name[0] : null}
            value={formState.values.name || ''}
            onChange={onChangeHandler}
          />
          <TextField
            fullWidth
            label="Dish Brief Description"
            margin="normal"
            name="description"
            variant="outlined"
            multiline
            rows={4}
            error={hasError('description')}
            helperText={
              hasError('description') ? formState.errors.description[0] : null
            }
            value={formState.values.description || ''}
            onChange={onChangeHandler}
          />
          <TextField
            fullWidth
            label="Dish price"
            margin="normal"
            name="price"
            variant="outlined"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
              inputProps: { min: '1', step: '1' }
            }}
            error={hasError('price')}
            helperText={hasError('price') ? formState.errors.price[0] : null}
            value={formState.values.price || ''}
            onChange={onChangeHandler}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="category"
              label="Category"
              value={formState.values.category || ''}
              error={hasError('category')}
              helperText={
                hasError('category') ? formState.errors.category[0] : null
              }
              onChange={onChangeHandler}
            >
              <MenuItem value="">
                <em>Please select a category</em>
              </MenuItem>
              {categories.map(({ _id, name }) => {
                return (
                  <MenuItem key={_id} value={_id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ margin: '10px 0' }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Availability
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              name="availability"
              value={formState.values.availability || ''}
              input={<OutlinedInput label="Availability" />}
              renderValue={(selected) =>
                selected.map(({ label }) => label).join(' ,')
              }
              MenuProps={MenuProps}
              error={hasError('availability')}
              helperText={
                hasError('availability')
                  ? formState.errors.availability[0]
                  : null
              }
              onChange={onChangeHandler}
            >
              <MenuItem value="">
                <em>Please select When It Is Available</em>
              </MenuItem>
              {availabilities.map((availability) => (
                <MenuItem key={availability._id} value={availability}>
                  <Checkbox
                    checked={
                      formState.values.availability.indexOf(availability) > -1
                    }
                  />
                  <ListItemText primary={availability.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Preparation Time"
            margin="normal"
            variant="outlined"
            name="preparitionTime"
            type="number"
            value={formState.values.preparitionTime}
            onChange={onChangeHandler}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Minutes</InputAdornment>
              ),
              inputProps: { min: '1', step: '1' }
            }}
            error={hasError('preparitionTime')}
            helperText={
              hasError('preparitionTime')
                ? formState.errors.preparitionTime[0]
                : null
            }
          />
          <TextField
            fullWidth
            label="Persons"
            margin="normal"
            variant="outlined"
            name="persons"
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formState.values.persons > 1 ? 'Persons' : 'Person'}
                </InputAdornment>
              ),
              inputProps: { min: '1', step: '1' }
            }}
            error={hasError('persons')}
            helperText={
              hasError('persons') ? formState.errors.persons[0] : null
            }
            value={formState.values.persons}
            onChange={onChangeHandler}
          />
          <TextField
            fullWidth
            label="Quantity"
            margin="normal"
            variant="outlined"
            name="quantity"
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formState.values.quantity > 1 ? 'pieces' : 'piece'}
                </InputAdornment>
              ),
              inputProps: { min: '1', step: '1' }
            }}
            error={hasError('quantity')}
            helperText={
              hasError('quantity') ? formState.errors.quantity[0] : null
            }
            value={formState.values.quantity}
            onChange={onChangeHandler}
          />
          <TextField
            fullWidth
            label="Image URL"
            margin="normal"
            name="image"
            variant="outlined"
            error={hasError('image')}
            helperText={hasError('image') ? formState.errors.image[0] : null}
            value={formState.values.image || ''}
            onChange={onChangeHandler}
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={submitFormHandler}
              disabled={!formState.isValid}
            >
              Add A New Dish Now
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NewDish;
