import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BlankPage from '../../components/BlankPage';
import PersonResultCrenca from './PersonResultCrenca';
import api from '../../services/api';
import PersonResultMmd from './PersonResultMmd';

export default function Comportamento() {
  const [firstCrencaResult, secondCrencaResult] = useSelector(state => state.crencas.answers);
  const [firstMmdResult, setFirstMmdResult] = useState(undefined);
  const [secondMmdResult, setSecondMmdResult] = useState(undefined);

  useEffect(() => {
    async function fetchMmdData() {
      try {
        const { data } = await api.get('api/mmd');
        setFirstMmdResult(data[0]);
        setSecondMmdResult(data[1]);
        return;
      } catch (err) {
        toast.error('Ocorreu um erro', { contaierId: 'alerts' });
      }
    }
    fetchMmdData();
  }, []);

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
      <div className="row">
        {firstMmdResult && (
          <div className="col-md-6">
            <PersonResultMmd mmd={firstMmdResult} />
          </div>
        )}
        {secondMmdResult && (
          <div className="col-md-6">
            <PersonResultMmd mmd={secondMmdResult} />
          </div>
        )}
      </div>
    </BlankPage>
  );
}
