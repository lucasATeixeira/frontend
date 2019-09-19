import React from 'react';
import BlankPage from '../../components/BlankPage';
import Calendario from './Calendario';
import Actions from './Actions';

export default function Atuar() {
  return (
    <BlankPage>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <Actions />
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <Calendario />
            </div>
          </div>
        </div>
      </div>
    </BlankPage>
  );
}
