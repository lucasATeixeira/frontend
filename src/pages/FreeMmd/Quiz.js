import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Option from './Option';
import api from '../../services/api';

export default function Quiz({ mmd, setMmdState }) {
  const { questoes } = mmd;
  const percent = (mmd.current / mmd.total) * 100;
  const [currentName, setCurrentName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleNameSave() {
    if (!currentName) {
      return toast.error('Insira seu nome para começar o teste');
    }
    setLoading(true);
    const { data: id } = await api.post('api/lead', {
      email: mmd.email,
      name: currentName,
    });
    setLoading(false);
    return setMmdState(c => ({ ...c, name: currentName, id }));
  }
  return (
    <>
      <div className="row">
        <div className="col-md-9 ml-auto mr-auto">
          <div className="questionCount text-center">
            {Math.round(percent)}% Respondido
          </div>
          {mmd.name ? (
            <>
              <h2 className="question text-center">
                {questoes[mmd.current].pergunta}
              </h2>
              <ul className="answerOptions">
                <Option
                  setMmdState={setMmdState}
                  mmd={mmd}
                  name={mmd.name}
                  peso={0}
                  content="Nunca"
                />
                <Option
                  setMmdState={setMmdState}
                  mmd={mmd}
                  name={mmd.name}
                  peso={0.25}
                  content="Raramente"
                />
                <Option
                  setMmdState={setMmdState}
                  mmd={mmd}
                  name={mmd.name}
                  peso={0.5}
                  content="Às vezes"
                />
                <Option
                  setMmdState={setMmdState}
                  mmd={mmd}
                  name={mmd.name}
                  peso={0.75}
                  content="Frequentemente"
                />
                <Option
                  setMmdState={setMmdState}
                  mmd={mmd}
                  name={mmd.name}
                  peso={1}
                  content="Sempre"
                />
              </ul>
            </>
          ) : (
            <>
              <div>
                <h2 className="question text-center">Insira seu Nome</h2>
                <input
                  type="text"
                  value={currentName}
                  className="form-control"
                  onChange={e => setCurrentName(e.target.value)}
                  placeholder="Insira seu Nome aqui..."
                />
                <br />
                <button
                  type="button"
                  className="btn btn-info pull-right"
                  onClick={handleNameSave}
                >
                  {loading ? (
                    <i className="fa fa-spinner fa-pulse" />
                  ) : (
                    <strong>Salvar</strong>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

Quiz.propTypes = {
  mmd: PropTypes.shape().isRequired,
  setMmdState: PropTypes.func.isRequired,
};
