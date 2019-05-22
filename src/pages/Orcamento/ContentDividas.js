import React from 'react';
import PropTypes from 'prop-types';

import TableParcelados from './TableParcelados';
import TableCard from './TableCard';

const Component = ({ color, materialIcon }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <TableCard color={color} options={false} materialIcon={materialIcon}>
          <h4 className="card-title">
            <b>Parcelados</b>
          </h4>
          <br />
          <TableParcelados color={color} />
        </TableCard>
      </div>
    </div>
  </>
);

Component.propTypes = {
  color: PropTypes.string,
  materialIcon: PropTypes.string,
};

Component.defaultProps = {
  color: 'info',
  materialIcon: 'materialIcon',
};

export default Component;
