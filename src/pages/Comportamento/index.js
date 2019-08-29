import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import BlankPage from '../../components/BlankPage';
import PersonResultCrenca from './PersonResultCrenca';
import api from '../../services/api';
import PersonResultMmd from './PersonResultMmd';
import { Creators as CrencaActions } from '../../store/ducks/crencas';

export default function Comportamento() {
  const dispatch = useDispatch();

  const [firstCrencaResult, secondCrencaResult] = useSelector(
    state => state.crencas.answers
  );
  const [firstMmdResult, setFirstMmdResult] = useState(undefined);
  const [secondMmdResult, setSecondMmdResult] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: mmd } = await api.get('api/mmd');
        const { data: crenca } = await api.get('api/crenca');
        setFirstMmdResult(mmd[0]);
        setSecondMmdResult(mmd[1]);
        dispatch(CrencaActions.fetchCrenca(crenca));
        return;
      } catch (err) {
        toast.error('Ocorreu um erro', { contaierId: 'alerts' });
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <BlankPage>
      <div className="row">
        {secondMmdResult && (
          <div className="col-md-6">
            <PersonResultMmd mmd={secondMmdResult} />
          </div>
        )}
        {firstMmdResult && (
          <div className="col-md-6">
            <PersonResultMmd mmd={firstMmdResult} />
          </div>
        )}
      </div>
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
