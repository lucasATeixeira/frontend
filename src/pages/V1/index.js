import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlankPage from '../../components/BlankPage';
import Card from './Card';
import NewCard from './NewCard';

const V1 = ({ v1 }) => {
  const [newCard, setNewCard] = useState(false);
  return (
    <BlankPage>
      <h3>
        Acrescentar uma perspectiva de 1 ano{' '}
        <button
          onClick={() => setNewCard(true)}
          type="button"
          className="btn btn-link btn-just-icon"
        >
          <i className="material-icons">add_circle_outline</i>
        </button>
      </h3>
      <br />

      <div className="row">
        {newCard && <NewCard setNewCard={setNewCard} />}
        {v1.v1.map(v => (
          <Card key={v._id} content={v} />
        ))}
      </div>
    </BlankPage>
  );
};

V1.propTypes = {
  v1: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  v1: state.v1,
});

export default connect(mapStateToProps)(V1);
