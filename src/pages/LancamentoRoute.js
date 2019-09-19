/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LancamentoRoute = ({ component: Component, ...rest }) => {
  const { lancamento } = useSelector(state => state.user.user);
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('@Ondazul: token') && lancamento ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default LancamentoRoute;
