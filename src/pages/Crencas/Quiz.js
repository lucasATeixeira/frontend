import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Option from './Option';

const Quiz = ({ crencas }) => {
  const { questions } = crencas;
  const percent = (crencas.current / crencas.total) * 100;
  return (
    <div className="row">
      <div className="col-md-9 ml-auto mr-auto">
        <div className="card">
          <div className="card-body">
            <div className="questionCount text-center">{Math.round(percent)}% Respondido</div>
            <h2 className="question text-center">{questions[crencas.current].pergunta}</h2>
            <ul className="answerOptions">
              <Option peso={0} content="Nunca" />
              <Option peso={0.5} content="Raramente" />
              <Option peso={1} content="Pouco" />
              <Option peso={2} content="Regurlamente" />
              <Option peso={3} content="Frequentemente" />
              <Option peso={4} content="Sempre" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Quiz.propTypes = {
  crencas: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  crencas: state.crencas,
});

export default connect(mapStateToProps)(Quiz);
