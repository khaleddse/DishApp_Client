/* eslint-disable */
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Badge, Box, IconButton, Toolbar } from '@material-ui/core';
import { useDishState } from '../context/dishAppContext';

import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
 
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/all-dishes">
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
