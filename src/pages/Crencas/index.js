import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlankPage from '../../components/BlankPage';
import Quiz from './Quiz';
import './index.css';

const Crencas = ({ crencas }) => (
  <BlankPage>{crencas.done ? <h2>Quiz Feito</h2> : <Quiz />}</BlankPage>
);

Crencas.propTypes = {
  crencas: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({ crencas: state.crencas });

export default connect(mapStateToProps)(Crencas);
