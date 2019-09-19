/* eslint-disable no-new */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import moment from 'moment';

import { Creators } from '../../store/ducks/a30d';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

export default function Calendario() {
  const calendarRef = React.createRef();

  const [events, setEvents] = useState([]);

  const actions = useSelector(state => state.a30d.a30d);

  const dispatch = useDispatch();

  useEffect(() => {
    const datedActions = actions.filter(action => action.quando);

    setEvents(
      datedActions.map(a => ({
        id: a._id,
        title: a.acao,
        start: a.quando,
        end: moment(a.quando)
          .add('30', 'minutes')
          .format(),
      }))
    );
  }, [actions]);

  useEffect(() => {
    const draggableEl = document.getElementById('external-events');
    new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData(eventEl) {
        const title = eventEl.getAttribute('title');
        const id = eventEl.getAttribute('id');
        return {
          title,
          id,
        };
      },
    });
  }, []);

  function handleEventReceive(data) {
    const { event } = data;
    const { start: date, id } = event;

    dispatch(
      Creators.updateA30dRequest({
        body: {
          quando: date,
        },
        _id: id,
      })
    );
  }

  function handleEventDrop(data) {
    const { event } = data;
    const { start: date, id } = event;

    dispatch(
      Creators.updateA30dRequest({
        body: {
          quando: date,
        },
        _id: id,
      })
    );
  }

  return (
    <FullCalendar
      ref={calendarRef}
      defaultView="dayGridMonth"
      droppable
      editable
      locale="pt-br"
      plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
      weekends={false}
      events={events}
      eventReceive={handleEventReceive}
      eventDrop={handleEventDrop}
      header={{
        left: 'prev, next',
        center: 'title',
        right: 'dayGridMonth, listWeek, dayGridWeek',
      }}
      // datesRender={({ view }) => handleDatesRender(view)}
    />
  );
}
