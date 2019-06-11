import React from 'react';
import TopInfo from '../TopInfo';
import CardOne from './CardOne';
import CardTwo from './CardTwo';

const RecExt = () => (
  <div className="row">
    <div className="col-md-12">
      <h2>Recebimentos Extras</h2>
      <TopInfo />
      <div className="row">
        <div className="col-md-6">
          <CardOne />
        </div>
        <div className="col-md-6">
          <CardTwo />
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

export default RecExt;
