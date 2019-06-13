import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TypeCard from './TypeCard';
import RadarChart from './RadarChart';
import BarChart from './BarChart';
import Info from './Info';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';

const PlanCard = ({ content }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div style={{ position: 'absolute', right: '0' }} className="card-header">
          <div>
            <button type="button" className="btn btn-danger btn-link btn-just-icon btn-sm">
              <i className="material-icons">close</i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <TypeCard />
            <Info content={content} />
            <RadarChart />
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  </div>
);

PlanCard.propTypes = {
  content: PropTypes.shape(),
};

PlanCard.defaultProps = {
  content: {},
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanCard);
