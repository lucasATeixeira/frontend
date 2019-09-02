/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function Option({ content, peso, mmd, name, setMmdState }) {
  const question = mmd.questoes[mmd.current];

  const [clicked, setClicked] = useState(false);

  function next(data) {
    setMmdState({ ...mmd, ...data, current: mmd.current + 1 });
  }

  async function saveRequest(payload) {
    const { quiz } = payload;
    try {
      const response = await api.put(`api/lead/${mmd.id}`, quiz);
      setMmdState(c => ({
        ...c,
        answers: [...c.answers, response.data],
        done: true,
      }));
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function handleChange() {
    setClicked(true);

    function handleCalculation() {
      if (mmd.current >= mmd.total - 1) {
        setMmdState(m => ({ ...m, doing: false }));

        const conjuntural = mmd.esperanca + mmd.reatividade + mmd.inseguranca;
        const estrutural = mmd.carencia + mmd.identificacao + mmd.insatisfacao;
        const oportunidade = mmd.negligencia + mmd.impulsividade + mmd.otimismo;

        saveRequest({
          quiz: {
            name,
            total: (conjuntural + estrutural + oportunidade) / 400,
            conjuntural,
            estrutural,
            oportunidade,
            esperanca: mmd.esperanca,
            reatividade: mmd.reatividade,
            inseguranca: mmd.inseguranca,
            carenciaEmocional: mmd.carencia,
            insatisfacaoPessoal: mmd.insatisfacao,
            identificacaoExterna: mmd.identificacao,
            negligencia: mmd.negligencia,
            impulsividade: mmd.impulsividade,
            otimismo: mmd.otimismo,
          },
        });
        return;
      }
      next({
        ...mmd,
        questoes: mmd.questoes.map(a => {
          if (a.pergunta !== question.pergunta) return a;
          return {
            ...a,
            valor: peso,
          };
        }),
        esperanca:
          mmd.esperanca +
          peso * question.scores.scoreEsperanca * mmd.pesos.pesoEsperanca,
        reatividade:
          mmd.reatividade +
          peso * question.scores.scoreReatividade * mmd.pesos.pesoReatividade,
        inseguranca:
          mmd.inseguranca +
          peso * question.scores.scoreInseguranca * mmd.pesos.pesoInseguranca,
        carencia:
          mmd.carencia +
          peso * question.scores.scoreCarencia * mmd.pesos.pesoCarencia,
        insatisfacao:
          mmd.insatisfacao +
          peso * question.scores.scoreInsatisfacao * mmd.pesos.pesoInsatisfacao,
        identificacao:
          mmd.identificacao +
          peso *
            question.scores.scoreIdentificacao *
            mmd.pesos.pesoIdentificacao,
        negligencia:
          mmd.negligencia +
          peso * question.scores.scoreNegligencia * mmd.pesos.pesoNegligencia,
        impulsividade:
          mmd.impulsividade +
          peso *
            question.scores.scoreImpulsividade *
            mmd.pesos.pesoImpulsividade,
        otimismo:
          mmd.otimismo +
          peso * question.scores.scoreOtimismo * mmd.pesos.pesoOtimismo,
      });
      setClicked(false);
    }
    setTimeout(() => {
      handleCalculation();
    }, 250);
  }
  return (
    <li className="answerOption">
      <input
        value={content}
        id={content}
        onChange={handleChange}
        checked={clicked}
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
      />
      <label className="radioCustomLabel" htmlFor={content}>
        {content}
      </label>
    </li>
  );
}

Option.propTypes = {
  content: PropTypes.string.isRequired,
  peso: PropTypes.number.isRequired,
  mmd: PropTypes.shape().isRequired,
  name: PropTypes.string.isRequired,
  setMmdState: PropTypes.func.isRequired,
};
