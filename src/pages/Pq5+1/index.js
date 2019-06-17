import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlankPage from '../../components/BlankPage';
import LoadSimulation from './LoadSimulation';
import Main from './Main';
import Simulation from './Simulation';
import Detail from './Detail';

const Pq5 = ({ simulacao }) => (
  <BlankPage>
    {simulacao.loading ? (
      <h2>Loading</h2>
    ) : (
      <>
        {simulacao.fetched ? (
          <>{simulacao.simulating ? <Simulation /> : simulacao.details ? <Detail /> : <Main />}</>
        ) : (
          <LoadSimulation />
        )}
      </>
    )}
  </BlankPage>
);

Pq5.propTypes = {
  simulacao: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

export default connect(mapStateToProps)(Pq5);
