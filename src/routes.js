import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import NewDish from './pages/NewDish';
import ProductList from './pages/ProductList';
import MyCart from './pages/MyCart';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'my-cart', element: <MyCart /> },
      { path: 'all-dishes', element: <ProductList /> },
      { path: 'new-dish', element: <NewDish /> },
      { path: '/', element: <Navigate exact to="/all-dishes" /> }
    ]
  }
];

export default routes;
