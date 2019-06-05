import React from 'react';
import TableAtivos from './TableAtivos';
import TableVendas from './TableVendas';

const StageOne = () => (
  <div className="row">
    <div className="col-md-6">
      <TableAtivos />
    </div>
    <div className="col-md-6">
      <TableVendas />
    </div>
  </div>
);

export default StageOne;
