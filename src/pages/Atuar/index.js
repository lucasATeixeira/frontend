import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BlankPage from '../../components/BlankPage';
import Calendario from './Calendario';
import Actions from './Actions';
import { Creators as dataActions } from '../../store/ducks/data';

export default function Atuar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataActions.fetchDataRequest());
  }, []);

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
