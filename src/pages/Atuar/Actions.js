import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './style.css';

export default function Actions() {
  const [notEvents, setNotEvents] = useState([]);

  const actions = useSelector(state => state.a30d.a30d);

  useEffect(() => {
    setNotEvents(actions.filter(action => !action.quando));
  }, [actions]);
  return (
    <div id="external-events">
      <h3>Ações</h3>
      {notEvents.map(notEvent => (
        <div
          key={notEvent._id}
          title={notEvent.acao}
          id={notEvent._id}
          className="fc-event"
        >
          {notEvent.acao}
        </div>
      ))}
    </div>
  );
}
