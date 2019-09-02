import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Upper from './Upper';
import Quiz from './Quiz';
import './index.css';
import questoes from './QuestoesMMD';
import StartQuizOptions from './StartQuizOptions';

export default function FreeMmd() {
  const [mmdState, setMmdState] = useState({
    id: null,
    answers: [],
    current: 0,
    questoes,
    total: questoes.length,
    pesos: {
      pesoEsperanca: 1.0582,
      pesoReatividade: 0.9661,
      pesoInseguranca: 1.0582,
      pesoCarencia: 1.0101,
      pesoInsatisfacao: 0.9259,
      pesoIdentificacao: 0.9876,
      pesoNegligencia: 0.9259,
      pesoImpulsividade: 1.0335,
      pesoOtimismo: 1.0582,
    },
    done: false,
    doing: false,
    name: null,
    email: null,
  });
  return (
    <>
      <Upper />
      <ToastContainer />
      <div className="wrapper wrapper-full-page">
        <div
          className="page-header login-page header-filter"
          filter-color="black"
          style={{
            backgroundImage: "url('assets/img/realeasy.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <div className="container">
            <div className="card">
              {mmdState.done ? (
                <>
                  <h2 style={{ marginTop: '50px' }} className="text-center">
                    Tudo certo, {mmdState.name}!!
                  </h2>
                  <br />
                  <h4 style={{ marginBottom: '50px' }} className="text-center">
                    Enviamos o Laudo com sua resposta para {mmdState.email}
                  </h4>
                </>
              ) : (
                <>
                  {!mmdState.doing && (
                    <StartQuizOptions
                      mmdState={mmdState}
                      setMmdState={setMmdState}
                    />
                  )}
                  {mmdState.doing && (
                    <Quiz mmd={mmdState} setMmdState={setMmdState} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
