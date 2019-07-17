import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';
import LiqPat from './LiqPat';
import RecExt from './RecExt';
import EmpAmig from './EmpAmig';
import ConDiv from './ConDiv';
import EnxGas from './EnxGas';

const Detail = ({ endDetails, content }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <button onClick={() => endDetails()} className="btn btn-success" type="button">
          <i className="fa fa-arrow-left" />
          <strong> Voltar</strong>
        </button>
      </div>
    </div>
    <h2>
      {content.type === 'lp'
        ? 'Liquidação Patrimonial'
        : content.type === 'ea'
          ? 'Empréstimo entre Amigos'
          : content.type === 'cd'
            ? 'Consolidação de dívidas'
            : content.type === 'eg'
              ? 'Enxugar Gastos'
              : 'Recebimentos Extras'}
    </h2>
    {content.type === 'lp' && <LiqPat content={content} />}
    {content.type === 're' && <RecExt content={content} />}
    {content.type === 'ea' && <EmpAmig content={content} />}
    {content.type === 'cd' && <ConDiv content={content} />}
    {content.type === 'eg' && <EnxGas content={content} />}
  </>
);

Detail.propTypes = {
  endDetails: PropTypes.func.isRequired,
  content: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  content: state.simulacao.currentDetail,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
