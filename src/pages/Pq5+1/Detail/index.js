import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';
import LiqPat from './LiqPat';
import RecExt from './RecExt';
import EmpAmig from './EmpAmig';
import ConDiv from './ConDiv';

const Detail = ({ endDetails, content }) => {
  console.log(content);
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <button
            onClick={() => endDetails()}
            className="btn btn-grafiti btn-link btn-just-icon btn-sm"
            type="button"
          >
            <i className="fa fa-arrow-left" />
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
              : 'Recebimentos Extras'}
      </h2>
      {content.type === 'lp' && <LiqPat />}
      {content.type === 'rc' && <RecExt />}
      {content.type === 'ea' && <EmpAmig />}
      {content.type === 'cd' && <ConDiv />}
    </>
  );
};

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
