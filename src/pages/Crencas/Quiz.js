import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Option from './Option';

const Quiz = ({ crencas }) => {
  const { questions } = crencas;
  const [name, setName] = useState('');
  const percent = (crencas.current / crencas.total) * 100;
  return (
    <>
      <div className="row">
        <div className="col-md-9 ml-auto mr-auto">
          <div className="card">
            <div className="card-body">
              <input
                type="text"
                className="form-control"
                placeholder="Quem está fazendo o Formulário?"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <div className="questionCount text-center">{Math.round(percent)}% Respondido</div>
              <h2 className="question text-center">{questions[crencas.current].pergunta}</h2>
              <ul className="answerOptions">
                <Option name={name} peso={0} content="Nunca" />
                <Option name={name} peso={0.5} content="Raramente" />
                <Option name={name} peso={1} content="Pouco" />
                <Option name={name} peso={2} content="Regurlamente" />
                <Option name={name} peso={3} content="Frequentemente" />
                <Option name={name} peso={4} content="Sempre" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Quiz.propTypes = {
  crencas: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  crencas: state.crencas,
});

export default connect(mapStateToProps)(Quiz);
