import React, { useState, useEffect } from 'react';
import moment from 'moment';
import api from '../../services/api';
import { ContainerAtuar } from './style';

export default function Atuar() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    async function fetchActions() {
      const { data: appointmentsFetched } = await api.get('api/appointment');
      const { data: a30dActionsFetched } = await api.get('api/a30d');

      const a30dActions = a30dActionsFetched
        .filter(action => action.quando)
        .filter(
          action =>
            moment(action.quando)
              .endOf('day')
              .utc() >=
            moment()
              .utc()
              .startOf('day')
        );

      const appointments = appointmentsFetched
        .filter(
          action =>
            moment(action.date)
              .utc()
              .endOf('day') >=
            moment()
              .utc()
              .startOf('day')
        )
        .map(a => ({
          _id: a._id,
          acao: 'Seção Avulsa',
          quando: a.date,
        }));

      const array = appointments
        .concat(a30dActions)
        .sort((a, b) =>
          moment(a.quando).utc() > moment(b.quando).utc() ? 1 : -1
        )
        .slice(0, 3);

      setActions(array);
    }

    fetchActions();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <strong>Atuar</strong>
        </h3>
        <p className="category">Seus próximpos passos</p>
      </div>
      <div className="card-body">
        <ContainerAtuar
          onClick={() => {
            window.location.href = '/atuar';
          }}
        >
          {actions.map(action => (
            <div key={action._id} className="appointment">
              <i className="material-icons">calendar_today</i>
              <h2>{action.acao}</h2>
              <span className="data">
                {moment(action.quando)
                  .utc()
                  .format('D/MM')}{' '}
                -{' '}
                {moment(action.quando)
                  .utc()
                  .format('dddd')}
              </span>
            </div>
          ))}
        </ContainerAtuar>
      </div>
    </div>
  );
}
