/* eslint-disable no-alert */
import React from 'react';
import Stage from './Stage';
import TopInfo from '../TopInfo';

const LiqPat = () => (
  <>
    <div className="row">
      <div className="col-md-12">
        <h2>Liquidação Patrimonial</h2>
        <TopInfo />
      </div>
    </div>
    <Stage />
  </>
);

export default LiqPat;
