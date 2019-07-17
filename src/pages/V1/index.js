import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlankPage from '../../components/BlankPage';
import Card from './Card';
import NewCard from './NewCard';

const V1 = ({ v1, v5 }) => {
  const [newCard, setNewCard] = useState(false);
  return (
    <BlankPage>
      <div className="row">
        <div className="col-md-4">
          <h2>Visão de 5 anos</h2>
          <br />
          <br />
          {v5.v5.map(v => (
            <Card key={v._id} content={v} size="12" animation={false} />
          ))}
        </div>
        <div className="col-md-8">
          <h3>
            <button onClick={() => setNewCard(true)} type="button" className="btn btn-success ">
              <strong>
                <i className="material-icons">add_circle_outline</i> Incluir Visão de 1 ano
              </strong>
            </button>
          </h3>

          <br />
          <div className="row">
            {newCard && <NewCard setNewCard={setNewCard} />}
            {v1.v1.map(v => (
              <Card key={v._id} content={v} />
            ))}
          </div>
        </div>
      </div>
    </BlankPage>
  );
};

V1.propTypes = {
  v1: PropTypes.shape().isRequired,
  v5: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  v1: state.v1,
  v5: state.v5,
});

export default connect(mapStateToProps)(V1);
