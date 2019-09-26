/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import api from '../../services/api';
import { ModalContainer } from './style';

export default function Modal({
  setModal,
  book,
  loading,
  date,
  setDate,
  availableHours,
  setAvailableHours,
  selectedHour,
  setSelectedHour,
}) {
  async function handleDateChange(selectedDate) {
    setSelectedHour(null);

    const { data: hours } = await api.get(
      `api/appointment/${moment(selectedDate).format()}`
    );

    const availableHoursFetched = hours.filter(hour => hour.available);

    setDate(selectedDate);

    setAvailableHours(availableHoursFetched);
  }

  return (
    <ModalContainer>
      <div className="card-made">
        <h3>Escolha uma data</h3>

        <DatePicker
          selected={date}
          onChange={selectedDate => handleDateChange(selectedDate)}
          placeholderText="Escolha uma data"
          className="form-control"
          // excludeDates={ days}
          minDate={new Date()}
        />

        {!!date && !!availableHours.length && (
          <h3 className="text-center">Escolha um horário!</h3>
        )}

        {!!date && !availableHours.length && (
          <h3
            style={{ marginBottom: '40px' }}
            className="text-center text-danger"
          >
            <strong>Nenhum horário disponível nesta data!</strong>
          </h3>
        )}

        {!!availableHours.length && (
          <div className="times">
            {availableHours.map(a => (
              <button
                onClick={() => setSelectedHour(a)}
                key={a.value}
                type="button"
                className={`time
                ${
                  selectedHour
                    ? a.value === selectedHour.value
                      ? 'active'
                      : ''
                    : null
                }
                `}
              >
                {a.time}
              </button>
            ))}
          </div>
        )}

        {!!selectedHour && (
          <h4 className="date-information">
            <strong>
              {moment(date).format('dddd, DD')} de {moment(date).format('MMMM')}{' '}
              às {moment(selectedHour).format('HH')} horas
            </strong>
          </h4>
        )}

        {!!selectedHour && (
          <button onClick={book} className=" btn btn-success" type="button">
            {loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              <strong>Agendar</strong>
            )}
          </button>
        )}
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
  book: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  date: PropTypes.any,
  setDate: PropTypes.func.isRequired,
  availableHours: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setAvailableHours: PropTypes.func.isRequired,
  selectedHour: PropTypes.shape(),
  setSelectedHour: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  selectedHour: null,
  date: null,
};
