import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Card from './Card';
import BlankPage from '../../components/BlankPage';
import Acoes from './Acoes';
import api from '../../services/api';

import { Creators as A30dActions } from '../../store/ducks/a30d';

const A30d = ({ v1 }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('api/a30d');
      dispatch(A30dActions.fetchDataA30d(data));
    }

    fetchData();
  }, [dispatch]);
  return (
    <BlankPage>
      <div className="row">
        <div className="col-md-4">
          <h2>Perspectiva de 1 ano</h2>
          {v1.map(v => (
            <Card key={v._id} content={v} />
          ))}
        </div>
        <div className="col-md-8">
          <h2>Ações dos Próximos 30 Dias</h2>
          <div className="card">
            <div className="card-body">
              <Acoes />
            </div>
          </div>
        </div>
      </div>
    </BlankPage>
  );
};

A30d.propTypes = {
  v1: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  v1: state.v1.v1,
});

export default connect(mapStateToProps)(A30d);
