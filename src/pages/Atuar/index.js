import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BlankPage from '../../components/BlankPage';
import Calendario from './Calendario';
import Actions from './Actions';
import { Creators as dataActions } from '../../store/ducks/data';

import Modal from './Modal';

export default function Atuar() {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  useEffect(() => {
    dispatch(dataActions.fetchDataRequest());
  }, [dispatch]);

  return (
    <BlankPage>
      {modal && (
        <Modal
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setModal={setModal}
        />
      )}
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
              <Calendario
                setModal={setModal}
                setSelectedEvent={setSelectedEvent}
              />
            </div>
          </div>
        </div>
      </div>
    </BlankPage>
  );
}
