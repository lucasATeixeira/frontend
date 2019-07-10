import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('@Ondazul: token') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  location: PropTypes.shape().isRequired,
}

export default PrivateRoute;
