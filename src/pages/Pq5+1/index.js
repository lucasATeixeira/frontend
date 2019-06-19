import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as DataActions } from '../../store/ducks/data';
import BlankPage from '../../components/BlankPage';
import LoadSimulation from './LoadSimulation';
import Main from './Main';
import Simulation from './Simulation';
import Detail from './Detail';
import Result from './Result';

const Pq5 = ({ simulacao, fetchDataRequest }) => {
  useEffect(() => {
    fetchDataRequest();
  }, [fetchDataRequest]);

  return (
    <BlankPage>
      {simulacao.loading ? (
        <h2>Loading</h2>
      ) : (
        <>
          {simulacao.fetched ? (
            <>
              {simulacao.simulating ? (
                <Simulation />
              ) : simulacao.details ? (
                <Detail />
              ) : simulacao.result ? (
                <Result />
              ) : (
                <Main />
              )}
            </>
          ) : (
            <LoadSimulation />
          )}
        </>
      )}
    </BlankPage>
  );
};

Pq5.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  fetchDataRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(DataActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pq5);
