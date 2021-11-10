import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderListResults from '../components/DishesOrdre/OrderListResults';
import OrddreListToolbar from '../components/DishesOrdre/OrdreListToolbar';
import { useDishState } from '../context/dishAppContext';

const MyCart = () => {
  const {
    state: { cart }
  } = useDishState();

  return (
    <>
      <Helmet>
        <title>My Order | Cart </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <OrddreListToolbar />
          <Box sx={{ pt: 3 }}>
            <OrderListResults dishes={cart.dishes} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MyCart;
