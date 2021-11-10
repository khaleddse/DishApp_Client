/* eslint-disable */
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { useDishState } from '../../context/dishAppContext';
import getInitials from '../../utils/getInitials';

const OrderListResults = ({ dishes, ...rest }) => {
  const {
    state: { cart }
  } = useDishState();

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>PreparitionTime</TableCell>
                <TableCell>can eaten by</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dishes.map((dish) => (
                <TableRow hover>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar src={dish.image} sx={{ mr: 2 }}>
                        {getInitials(dish.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {dish.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{dish.preparitionTime} min</TableCell>
                  <TableCell>{dish.persons} Persons</TableCell>
                  <TableCell>X {dish.quantity}</TableCell>
                  <TableCell>{dish.price} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default OrderListResults;
