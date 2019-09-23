import React from 'react';
import BlankPage from '../../components/BlankPage';
import Mapear from './Mapear';
import Almejar from './Almejar';
import Planejar from './Planejar';
import Atuar from './Atuar';

export default function Painel() {
  return (
    <BlankPage>
      <div className="row">
        <div className="col-md-6">
          <Mapear />
        </div>
        <div className="col-md-6">
          <Almejar />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Planejar />
        </div>
        <div className="col-md-6">
          <Atuar />
        </div>
      </div>
    </BlankPage>
  );
}
