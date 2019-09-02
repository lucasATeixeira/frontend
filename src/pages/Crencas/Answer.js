import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as CrencaActions } from '../../store/ducks/crencas';

const Answer = ({ crencas, newQuiz }) => (
  <div className="row">
    <div className="col-md-6">
      <h2>{crencas.answers[0].name}, Resposta do Quiz</h2>
    </div>
    <div className="col-md-6">
      {crencas.coupleDone ? (
        <h2>{crencas.answers[1].name}, Resposta do Quiz</h2>
      ) : (
        <button
          onClick={() => newQuiz()}
          className="btn btn-round btn-info"
          type="button"
        >
          <strong>Fazer Quiz do cônjuge</strong>
        </button>
      )}
    </div>
  </div>
);

Answer.propTypes = {
  crencas: PropTypes.shape().isRequired,
  newQuiz: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  crencas: state.crencas,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CrencaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer);
