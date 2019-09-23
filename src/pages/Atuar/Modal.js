import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { Creators } from '../../store/ducks/a30d';
import { ModalContainer } from './style';

export default function Modal({ setModal, setSelectedEvent, selectedEvent }) {
  const [acao, setAcao] = useState(selectedEvent.title || '');
  const [onde, setOnde] = useState(selectedEvent.onde || '');
  const [quem, setQuem] = useState(selectedEvent.quem || '');
  const [como, setComo] = useState(selectedEvent.como || '');
  const [quando, setQuando] = useState(selectedEvent.date || new Date());

  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(Creators.removeA30dRequest({ _id: selectedEvent.id }));
    setSelectedEvent({});
    setModal(false);
  }

  function handleCloseModal() {
    dispatch(
      Creators.updateA30dRequest({
        body: {
          quando,
          acao,
          onde,
          quem,
          como,
        },
        _id: selectedEvent.id,
      })
    );

    setSelectedEvent({});
    setModal(false);
  }

  return (
    <ModalContainer>
      <div className="card-made">
        <h2>Evento: {acao}</h2>
        <table>
          <tbody>
            <tr>
              <td>O quê</td>
              <td>
                <input
                  type="text"
                  value={acao}
                  onChange={e => setAcao(e.target.value)}
                  placeholder="O quê..."
                />
              </td>
            </tr>
            <tr>
              <td>Quando</td>
              <td>
                <DatePicker
                  selected={quando}
                  onChange={e => setQuando(e)}
                  dateFormat="dd/MM/yyyy"
                  locale="ptBR"
                />
              </td>
            </tr>
            <tr>
              <td>Onde</td>
              <td>
                <input
                  value={onde}
                  onChange={e => setOnde(e.target.value)}
                  type="text"
                  placeholder="Onde..."
                />
              </td>
            </tr>
            <tr>
              <td>Quem</td>
              <td>
                <input
                  value={quem}
                  onChange={e => setQuem(e.target.value)}
                  type="text"
                  placeholder="Quem..."
                />
              </td>
            </tr>
            <tr>
              <td>Como</td>
              <td>
                <input
                  value={como}
                  onChange={e => setComo(e.target.value)}
                  type="text"
                  placeholder="Como..."
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleDelete} className="btn btn-danger" type="button">
          <strong>Excluir</strong>
        </button>
        <button
          onClick={() => handleCloseModal()}
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
  setSelectedEvent: PropTypes.func.isRequired,
  selectedEvent: PropTypes.shape().isRequired,
};
