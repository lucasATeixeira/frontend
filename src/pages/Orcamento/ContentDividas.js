import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TableParcelados from './TableParcelados';
import TableDividas from './TableDividas';
import TableCard from './TableCard';

const Component = ({ color, materialIcon, patrimonios }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <TableCard color={color} options={false} materialIcon={materialIcon}>
          <h4 className="card-title text-uppercase">
            <b>Parcelados</b>
          </h4>
          <br />
          <TableParcelados color={color} />
        </TableCard>
      </div>
    </div>
    {!!patrimonios.passivos.list.length && (
      <div className="row">
        <div className="col-md-12">
          <TableCard color={color} options={false} materialIcon={materialIcon}>
            <h4 className="card-title text-uppercase">
              <b>Empréstimos e Financiamentos</b>
            </h4>
            <br />
            <TableDividas color={color} />
          </TableCard>
        </div>
      </div>
    )}
  </>
);

Component.propTypes = {
  color: PropTypes.string,
  materialIcon: PropTypes.string,
  patrimonios: PropTypes.shape().isRequired,
};

Component.defaultProps = {
  color: 'info',
  materialIcon: 'materialIcon',
};

const mapStateToProps = state => ({
  patrimonios: state.patrimonios,
});

export default connect(mapStateToProps)(Component);
