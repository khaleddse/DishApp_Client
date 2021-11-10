/* eslint-disable */
import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem, Badge } from '@material-ui/core';

import { useDishState } from '../context/dishAppContext';

const NavItem = ({ href, icon: Icon, title, ...rest }) => {
  const {
    state: { cart }
  } = useDishState();

  const location = useLocation();

  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false
        },
        location.pathname
      )
    : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0
      }}
      {...rest}
    >
      <Button
        component={RouterLink}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'primary.main'
          }),
          '& svg': {
            mr: 1
          }
        }}
        to={href}
      >
        {Icon && <Icon size="20" />}
        <span>{title}</span>
        {title === 'My Cart' && (
          <Badge
            badgeContent={cart.dishes.length}
            color="error"
            style={{ marginLeft: 'auto' }}
          ></Badge>
        )}
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
