import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { ModalContainer } from './style';

export default function Modal({
  setModal,
  name,
  setName,
  pmt,
  setPmt,
  parcelas,
  setParcelas,
  taxa,
  setTaxa,
  handleSubmit,
}) {
  function handleCloseModal() {
    setModal(false);
  }

  return (
    <ModalContainer>
      <div className="card-made">
        <form onSubmit={handleSubmit}>
          <h2>Nova Dívida</h2>
          <table>
            <tbody>
              <tr>
                <td>Nome</td>
                <td>
                  <input
                    placeholder="Nome..."
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Valor da Parcela</td>
                <td>
                  <CurrencyInput
                    decimalSeparator=","
                    thousandSeparator="."
                    precision="2"
                    prefix="R$"
                    value={pmt}
                    onChangeEvent={(e, mv, fv) => setPmt(fv)}
                  />
                </td>
              </tr>
              <tr>
                <td>Parcelas Restantes</td>
                <td>
                  <input
                    type="number"
                    value={parcelas}
                    onChange={e => setParcelas(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Taxa Mensal</td>
                <td>
                  <CurrencyInput
                    decimalSeparator=","
                    thousandSeparator="."
                    precision="2"
                    suffix="%"
                    value={taxa}
                    onChangeEvent={(e, mv, fv) => setTaxa(fv)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={() => handleCloseModal()}
            type="button"
            className="fechar"
          >
            <i className="material-icons">close</i>
          </button>

          <button className="btn btn-info" type="submit">
            <strong>Adicionar</strong>
          </button>
        </form>
      </div>
    </ModalContainer>
  );
}

Modal.propTypes = {
  setModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  pmt: PropTypes.number.isRequired,
  setPmt: PropTypes.func.isRequired,
  parcelas: PropTypes.number.isRequired,
  setParcelas: PropTypes.func.isRequired,
  taxa: PropTypes.number.isRequired,
  setTaxa: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
