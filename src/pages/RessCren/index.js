import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as CrencaActions } from '../../store/ducks/crencas';
import BlankPage from '../../components/BlankPage';

const RessCren = ({ crencas, updateRequest }) => {
  const [input, setInput] = useState('');
  const [ress, setRess] = useState('');
  const [parent, setParent] = useState({});
  const [child, setChild] = useState({});

  const handleKeyUp = (e) => {
    if (e.keyCode !== 27) return;
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRequest({
      _id: parent._id,
      crencas: parent.crencas.map((a) => {
        if (a._id !== child._id) return a;
        return {
          ...a,
          ress,
        };
      }),
    });
    setInput('');
    setParent({});
  };

  return (
    <BlankPage>
      <h2>Ressignificação de Crenças</h2>
      <div className="row">
        {crencas.answers.map(b => b.crencas.map(a => (
          <div key={a._id} className="col-md-4">
            <form onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
              <div className="card">
                <div
                  className={`card-header card-header-text card-header-${
                    a.ress ? 'success' : 'danger'
                  }`}
                >
                  <div className="card-text">
                    <h4 className="card-title">
                      <strong>{b.name}</strong>
                    </h4>
                  </div>
                </div>
                <div className="card-body">
                  {a.ress ? (
                    <strike>
                      <blockquote className="blockquote">
                        <p className="mb-0">&quot;{a.crenca}&quot;</p>
                      </blockquote>
                    </strike>
                  ) : (
                    <blockquote className="blockquote">
                      <p className="mb-0">&quot;{a.crenca}&quot;</p>
                    </blockquote>
                  )}
                  {input === a._id ? (
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        value={ress}
                        onChange={e => setRess(e.target.value)}
                      />
                    </div>
                  ) : (
                    <blockquote className="blockquote">
                      {a.ress ? <p className="mb-0">&quot;{a.ress}&quot;</p> : <p />}
                    </blockquote>
                  )}
                  {input !== a._id ? (
                    <button
                      onClick={() => {
                        setInput(a._id);
                        setParent(b);
                        setChild(a);
                        setRess(a.ress ? a.ress : '');
                      }}
                      type="button"
                      className="btn btn-success btn-sm btn-link pull-right"
                    >
                      <strong>
                        <i className="material-icons">add_circle_outline</i> Ressignificar
                      </strong>
                    </button>
                  ) : (
                    <>
                      <div className="pull-right">
                        <button type="submit" className="btn btn-success btn-sm">
                            <strong>
                              <i className="material-icons">add_circle_outline</i> Salvar
                            </strong>
                          </button>
                        <button
                            onClick={() => {
                              setInput('');
                              setParent({});
                              setChild({});
                            }}
                            type="button"
                            className="btn btn-danger btn-link btn-just-icon btn-sm"
                          >
                            <i className="material-icons">close</i>
                          </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        )))}
      </div>
    </BlankPage>
  );
};

RessCren.propTypes = {
  crencas: PropTypes.shape().isRequired,
  updateRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  crencas: state.crencas,
});

const mapDispatchToProps = dispatch => bindActionCreators(CrencaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RessCren);
