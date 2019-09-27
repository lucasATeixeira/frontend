import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ContainerAtuar } from './style';

export default function Atuar() {
  const actions = useSelector(state =>
    state.a30d.a30d
      .filter(action => action.quando)
      .filter(
        action =>
          moment(action.quando).utc() >=
          moment()
            .utc()
            .startOf('day')
      )
      .sort((a, b) =>
        moment(a.quando).utc() > moment(b.quando).utc() ? 1 : -1
      )
      .slice(0, 3)
  );

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <strong>Atuar</strong>
        </h3>
        <p className="category">Seus próximpos passos</p>
      </div>
      <div className="card-body">
        <ContainerAtuar>
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
