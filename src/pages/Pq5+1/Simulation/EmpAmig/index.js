import React from 'react';
import TopInfo from '../TopInfo';
import CardOne from './CardOne';
import DividasTable from '../DividasTable';

const EmpAmig = () => (
  <div className="row">
    <div className="col-md-12">
      <h2>Empréstimo Entre Amigos</h2>
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

export default EmpAmig;
