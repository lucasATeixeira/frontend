import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import One from './One';
import Two from './Two';
import { Creators as SimulacaoActions } from '../../../../store/ducks/simulacao';

const EnxGas = ({ orcamento }) => {
  const [enxugar, setEnxugar] = useState(false);
  const [listData, setListData] = useState(
    orcamento.categorias
      .filter(c => c.tipo === 'gasto' && c.nome !== 'DIVERSOS')
      .map(c =>
        c.itens
          .filter(i => i.mensal)
          .map(i => ({
            ...i,
            quadrante: 3,
            nomeCategoria: c.nome,
            orcadoLocale: i.orcado.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }),
            mensalLocale: i.mensal.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }),
            prioridadeValue: false,
            substituivelValue: false,
            media: (
              <div className="text-center">
                <i
                  className={` text-${
                    i.mensal <= orcamento.mediaGastos ? 'success' : 'danger'
                  } fa fa-arrow-${
                    i.mensal <= orcamento.mediaGastos ? 'down' : 'up'
                  }`}
                />
              </div>
            ),
          }))
      )
      .flat()
  );
  const handlePrioridadeChange = (e, id, mediaMenor) => {
    setListData(
      listData.map(l => {
        if (l._id !== id) return l;
        let quadrante = 0;
        if (!e.target.checked && !l.substituivelValue && !mediaMenor)
          quadrante = 1; // sem
        if (!e.target.checked && !l.substituivelValue && mediaMenor)
          quadrante = 2; // sem
        if (!e.target.checked && l.substituivelValue && !mediaMenor)
          quadrante = 3;
        if (e.target.checked && !l.substituivelValue && !mediaMenor)
          quadrante = 4; // sem
        if (e.target.checked && !l.substituivelValue && mediaMenor)
          quadrante = 5; // sem
        if (!e.target.checked && l.substituivelValue && mediaMenor)
          quadrante = 6;
        if (e.target.checked && l.substituivelValue && !mediaMenor)
          quadrante = 7;
        if (e.target.checked && l.substituivelValue && mediaMenor)
          quadrante = 8;
        return {
          ...l,
          prioridadeValue: e.target.checked,
          quadrante,
        };
      })
    );
  };
  const handleSubstituivelChange = (e, id, mediaMenor) => {
    setListData(
      listData.map(l => {
        if (l._id !== id) return l;
        let quadrante = 0;
        if (!l.prioridadeValue && !e.target.checked && !mediaMenor)
          quadrante = 1; // sem
        if (!l.prioridadeValue && !e.target.checked && mediaMenor)
          quadrante = 2; // sem
        if (!l.prioridadeValue && e.target.checked && !mediaMenor)
          quadrante = 3;
        if (l.prioridadeValue && !e.target.checked && !mediaMenor)
          quadrante = 4; // sem
        if (l.prioridadeValue && !e.target.checked && mediaMenor) quadrante = 5; // sem
        if (!l.prioridadeValue && e.target.checked && mediaMenor) quadrante = 6;
        if (l.prioridadeValue && e.target.checked && !mediaMenor) quadrante = 7;
        if (l.prioridadeValue && e.target.checked && mediaMenor) quadrante = 8;
        return {
          ...l,
          substituivelValue: e.target.checked,
          quadrante,
        };
      })
    );
  };

  return (
    <>
      <h2>Enxugar Gastos</h2>
      {enxugar ? (
        <Two listData={listData} />
      ) : (
        <One
          orcamento={orcamento}
          listData={listData}
          handlePrioridadeChange={handlePrioridadeChange}
          handleSubstituivelChange={handleSubstituivelChange}
          setEnxugar={setEnxugar}
        />
      )}
    </>
  );
};

EnxGas.propTypes = {
  orcamento: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  orcamento: state.categorias,
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnxGas);
