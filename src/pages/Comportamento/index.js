import React from 'react';
import { useSelector } from 'react-redux';
import BlankPage from '../../components/BlankPage';
import PersonResultCrenca from './PersonResultCrenca';

export default function Comportamento() {
  const [firstCrencaResult, secondCrencaResult] = useSelector(state => state.crencas.answers);
  return (
    <BlankPage>
      <div className="row">
        {firstCrencaResult && (
          <div className="col-md-6">
            <PersonResultCrenca crenca={firstCrencaResult} />
          </div>
        )}
        {secondCrencaResult && (
          <div className="col-md-6">
            <PersonResultCrenca crenca={secondCrencaResult} />
          </div>
        )}
      </div>
    </BlankPage>
  );
}
