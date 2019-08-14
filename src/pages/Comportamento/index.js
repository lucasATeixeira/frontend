import React from 'react';
import { useSelector } from 'react-redux';
import BlankPage from '../../components/BlankPage';
import PersonResult from './PersonResult';

export default function Comportamento() {
  const [firstCrencaResult, secondCrencaResult] = useSelector(state => state.crencas.answers);
  return (
    <BlankPage>
      <div className="row">
        {firstCrencaResult && (
          <div className="col-md-6">
            <PersonResult crenca={firstCrencaResult} />
          </div>
        )}
        {secondCrencaResult && (
          <div className="col-md-6">
            <PersonResult crenca={secondCrencaResult} />
          </div>
        )}
      </div>
    </BlankPage>
  );
}
