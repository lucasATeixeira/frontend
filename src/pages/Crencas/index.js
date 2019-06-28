import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlankPage from '../../components/BlankPage';
import Quiz from './Quiz';
import Answer from './Answer';
import './index.css';

const Crencas = ({ crencas }) => <BlankPage>{crencas.done ? <Answer /> : <Quiz />}</BlankPage>;

Crencas.propTypes = {
  crencas: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({ crencas: state.crencas });

export default connect(mapStateToProps)(Crencas);
