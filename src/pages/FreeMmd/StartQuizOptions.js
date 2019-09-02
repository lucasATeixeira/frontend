import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import questoes from './QuestoesMMD';

export default function StartQuizOptions({ mmdState, setMmdState }) {
  const [email, setEmail] = useState('');
  const [loading] = useState(false);

  async function handleEmailSave() {
    if (!email) return toast.error('Insira seu email para começar o teste');
    return setMmdState(c => ({
      ...c,
      doing: true,
      done: false,
      current: 0,
      questoes,
      total: questoes.length,
      esperanca: 0,
      reatividade: 0,
      inseguranca: 0,
      carencia: 0,
      insatisfacao: 0,
      identificacao: 0,
      negligencia: 0,
      impulsividade: 0,
      otimismo: 0,
      name: null,
      email,
    }));
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center">
          <h2 style={{ marginTop: '50px' }}>
            Teste MMD - Modelo Mental sobre Dinheiro
          </h2>
        </div>
        <div className="col-md-9 ml-auto mr-auto text-center">
          {!mmdState.done ? (
            <>
              <br />
              <input
                type="email"
                value={email}
                className="form-control"
                onChange={e => setEmail(e.target.value)}
                placeholder="Insira seu Melhor e-mail aqui..."
              />
              <br />
              <button
                style={{ marginBottom: '50px' }}
                type="button"
                onClick={handleEmailSave}
                className="btn btn-info"
              >
                {loading ? (
                  <i className="fa fa-spinner fa-pulse" />
                ) : (
                  <strong>Iniciar teste</strong>
                )}
              </button>
            </>
          ) : (
            <h2>Feito</h2>
          )}
        </div>
      </div>
    </>
  );
}
StartQuizOptions.propTypes = {
  mmdState: PropTypes.shape().isRequired,
  setMmdState: PropTypes.func.isRequired,
};
