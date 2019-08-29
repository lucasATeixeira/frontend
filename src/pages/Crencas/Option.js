/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { Creators as CrencasActions } from '../../store/ducks/crencas';

const Option = ({ content, peso, next, crencas, saveRequest, name }) => {
  const question = crencas.questions[crencas.current];
  const handleChange = () => {
    if (!name)
      return toast.error('Preencha um Nome antes de continuar!', {
        containerId: 'alerts',
      });
    if (crencas.current >= crencas.total - 1) {
      const ambiente =
        (crencas.ambiente /
          (crencas.total * 4) /
          (crencas.questions
            .map(q => (q.cat === 'ambiente' ? 1 : 0))
            .reduce((total, prox) => total + prox) /
            crencas.total)) *
        100;
      const causaEfeito =
        (crencas.causaEfeito /
          (crencas.total * 4) /
          (crencas.questions
            .map(q => (q.cat === 'causa e efeito' ? 1 : 0))
            .reduce((total, prox) => total + prox) /
            crencas.total)) *
        100;
      const capacidade =
        (crencas.capacidade /
          (crencas.total * 4) /
          (crencas.questions
            .map(q => (q.cat === 'capacidade' ? 1 : 0))
            .reduce((total, prox) => total + prox) /
            crencas.total)) *
        100;
      const valor =
        (crencas.valor /
          (crencas.total * 4) /
          (crencas.questions
            .map(q => (q.cat === 'valor' ? 1 : 0))
            .reduce((total, prox) => total + prox) /
            crencas.total)) *
        100;
      const identidade =
        (crencas.identidade /
          (crencas.total * 4) /
          (crencas.questions
            .map(q => (q.cat === 'identidade' ? 1 : 0))
            .reduce((total, prox) => total + prox) /
            crencas.total)) *
        100;
      const pertencimento =
        (crencas.pertencimento /
          (crencas.total * 4) /
          (crencas.questions
            .map(q => (q.cat === 'pertencimento' ? 1 : 0))
            .reduce((total, prox) => total + prox) /
            crencas.total)) *
        100;
      const espiritualidade =
        (crencas.espiritualidade /
          (crencas.total * 4) /
          (crencas.questions
            .map(q => (q.cat === 'espiritualidade' ? 1 : 0))
            .reduce((total, prox) => total + prox) /
            crencas.total)) *
        100;

      const { cat } = [
        { score: ambiente, cat: 'ambiente' },
        { score: causaEfeito, cat: 'causa e efeito' },
        { score: capacidade, cat: 'capacidade' },
        { score: valor, cat: 'valor' },
        { score: identidade, cat: 'identidade' },
        { score: pertencimento, cat: 'pertencimento' },
        { score: espiritualidade, cat: 'espiritualidade' },
      ].sort((a, b) => (a.score > b.score ? -1 : 1))[0];

      const crencasFinal = crencas.questions
        .filter(a => a.cat === cat)
        .sort((a, b) => (a.score > b.score ? -1 : 1))
        .slice(0, 3)
        .map(a => ({ crenca: a.pergunta }));

      saveRequest({
        quiz: {
          name,
          cat,
          crencas: crencasFinal,
          ambiente,
          causaEfeito,
          capacidade,
          valor,
          identidade,
          pertencimento,
          espiritualidade,
        },
        coupleDone: !!crencas.answers[0],
      });
      return;
    }
    next({
      ...crencas,
      questions: crencas.questions.map(a => {
        if (a.pergunta !== question.pergunta) return a;
        return {
          ...a,
          score: peso,
        };
      }),
      ambiente: crencas.ambiente + (question.cat === 'ambiente' ? peso : 0),
      causaEfeito:
        crencas.causaEfeito + (question.cat === 'causa e efeito' ? peso : 0),
      capacidade:
        crencas.capacidade + (question.cat === 'capacidade' ? peso : 0),
      valor: crencas.valor + (question.cat === 'valor' ? peso : 0),
      identidade:
        crencas.identidade + (question.cat === 'identidade' ? peso : 0),
      pertencimento:
        crencas.pertencimento + (question.cat === 'pertencimento' ? peso : 0),
      espiritualidade:
        crencas.espiritualidade +
        (question.cat === 'espiritualidade' ? peso : 0),
    });
  };
  return (
    <li className="answerOption">
      <input
        value={content}
        id={content}
        onChange={handleChange}
        checked={false}
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
      />
      <label className="radioCustomLabel" htmlFor={content}>
        {content}
      </label>
    </li>
  );
};

Option.propTypes = {
  content: PropTypes.string.isRequired,
  peso: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  crencas: PropTypes.shape().isRequired,
  saveRequest: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  crencas: state.crencas,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CrencasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Option);
