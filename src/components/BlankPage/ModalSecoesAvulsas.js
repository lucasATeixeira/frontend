import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { ModalContainer } from './style';

export default function Modal({ setModal }) {
  const [date, setDate] = useState(null);

  return (
    <ModalContainer>
      <div className="card-made">
        <h3>Escolha uma data</h3>

        <DatePicker
          selected={date}
          onChange={selectedDate => setDate(selectedDate)}
          minDate={
            new Date(
              moment()
                .add(1, 'days')
                .format()
            )
          }
          placeholderText="Escolha uma data"
          className="form-control"
        />

        <h3>Escolha um horário</h3>

        <div className="times">
          <button type="button" className="time">
            10:00
          </button>
          <button type="button" className="time">
            10:00
          </button>
          <button type="button" className="time active">
            10:00
          </button>
          <button type="button" className="time">
            10:00
          </button>
          <button type="button" className="time">
            10:00
          </button>
          <button type="button" className="time">
            10:00
          </button>
        </div>

        <button className="btn btn-info" type="button">
          <strong>Vamos lá</strong>
        </button>
        <button
          onClick={() => setModal(false)}
          type="button"
          className="fechar"
        >
          <i className="material-icons">close</i>
        </button>
      </div>
    </ModalContainer>
  );
}

Modal.propTypes = {
  setModal: PropTypes.func.isRequired,
};
