import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input';
import PropTypes from 'prop-types';
import { DividasContainer } from './style';

export default function Dividas({ dividas, setDividas }) {
  const [newDivida, setNewDivida] = useState(false);
  const [name, setName] = useState('');
  const [pmt, setPmt] = useState(0);
  const [parcelas, setParcelas] = useState(0);
  const [taxa, setTaxa] = useState(0);

  function handleDelete(divida) {
    const updatedDividas = dividas.filter(d => d !== divida);
    localStorage.setItem(
      '@Calculadora: dividas',
      JSON.stringify(updatedDividas)
    );
    setDividas(updatedDividas);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updatedDividas = [
      ...dividas,
      {
        name,
        pmt,
        parcelas,
        taxa,
      },
    ];

    localStorage.setItem(
      '@Calculadora: dividas',
      JSON.stringify(updatedDividas)
    );
    setDividas(updatedDividas);
    setName('');
    setPmt(0);
    setParcelas(0);
    setTaxa(0);
    setNewDivida(false);
  }

  return (
    <DividasContainer>
      <h3 className="text-info">Insira suas dívidas</h3>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th width="40%">Nome</th>
              <th width="30%">Valor da Parcela</th>
              <th width="15%">Parcelas Restantes</th>
              <th width="15%">Taxa Mensal</th>
            </tr>
          </thead>
          <tbody>
            {dividas.map(divida => (
              <tr key={Math.random()}>
                <td>{divida.name}</td>
                <td>
                  {divida.pmt.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
                <td>{divida.parcelas}</td>
                <td>
                  {divida.taxa}%
                  <button onClick={() => handleDelete(divida)} type="button">
                    <i className="material-icons">close</i>
                  </button>
                </td>
              </tr>
            ))}

            {newDivida && (
              <tr className="inputs">
                <td>
                  <input
                    placeholder="Nome..."
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </td>
                <td>
                  <CurrencyInput
                    className="form-control"
                    decimalSeparator=","
                    thousandSeparator="."
                    precision="2"
                    prefix="R$"
                    value={pmt}
                    onChangeEvent={(e, mv, fv) => setPmt(fv)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={parcelas}
                    onChange={e => setParcelas(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <CurrencyInput
                    className="form-control"
                    decimalSeparator=","
                    thousandSeparator="."
                    precision="2"
                    suffix="%"
                    value={taxa}
                    onChangeEvent={(e, mv, fv) => setTaxa(fv)}
                  />
                  <button
                    onClick={() => {
                      setNewDivida(false);
                    }}
                    type="button"
                  >
                    <i className="material-icons">close</i>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {newDivida ? (
          <div>
            <button className="btn btn-info btn-round btn-fab" type="submit">
              <strong>
                <i className="material-icons">add</i>
              </strong>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setNewDivida(true)}
            className="btn btn-info btn-round btn-fab"
            type="button"
          >
            <strong>
              <i className="material-icons">add</i>
            </strong>
          </button>
        )}
      </form>
    </DividasContainer>
  );
}

Dividas.propTypes = {
  dividas: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setDividas: PropTypes.func.isRequired,
};
