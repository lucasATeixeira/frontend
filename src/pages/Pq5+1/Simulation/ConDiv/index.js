import React from 'react';
import TopInfo from '../TopInfo';
import DividasTable from '../DividasTable';
import CardOne from './CardOne';

const ConDiv = () => (
  <div className="row">
    <div className="col-md-12">
      <h2>Consolidação de Dívidas</h2>
      <TopInfo />
      <div className="row">
        <div className="col-md-6">
          <CardOne />
        </div>
        <div className="col-md-6">
          <DividasTable />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-round pull-right btn-success" type="button">
            <strong>Salvar</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ConDiv;
