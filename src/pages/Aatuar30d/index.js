/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import BlankPage from '../../components/BlankPage';
import { Creators as A30dActions } from '../../store/ducks/a30d';
import 'react-datepicker/dist/react-datepicker.css';

const Aatuar30d = ({ a30d, updateA30dRequest }) => {
  const pStyle = { position: 'absolute', top: '10px' };
  const [id, setId] = useState('');
  const [input, setInput] = useState('');
  const [onde, setOnde] = useState('');
  const [quando, setQuando] = useState('');
  const [quem, setQuem] = useState('');
  const [como, setComo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateA30dRequest({
      body: {
        onde,
        quando,
        quem,
        como,
      },
      _id: id,
    });
    setId('');
    return setInput('');
  };

  const handleEdit = (a) => {
    setInput(a._id);
    setId(a._id);
    setOnde(a.onde ? a.onde : '');
    setQuando(a.quando ? new Date(a.quando) : new Date());
    setQuem(a.quem ? a.quem : '');
    setComo(a.como ? a.como : '');
  };

  return (
    <BlankPage>
      <h2>Ações Atuar 30 dias</h2>
      <div className="row">
        {a30d.a30d.map(a => (
          <div key={a._id} className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-body">
                  <h3>{a.acao}</h3>
                  <br />
                  <div className="form-group bmd-form-group is-filled">
                    <label htmlFor="1" className="bmd-label-static">
                      Onde?
                    </label>
                    {input === a._id ? (
                      <input
                        value={onde}
                        onChange={e => setOnde(e.target.value)}
                        type="text"
                        className="form-control"
                        id="1"
                      />
                    ) : (
                      <>
                        <span style={pStyle}>{a.onde}</span>
                      </>
                    )}
                  </div>
                  <br />
                  <div className="form-group bmd-form-group is-filled">
                    <label htmlFor="1" className="bmd-label-static">
                      Quando?
                    </label>
                    {input === a._id ? (
                      <DatePicker
                        selected={quando}
                        className="form-control"
                        onChange={e => setQuando(e)}
                        dateFormat="dd/MM/yyyy"
                        locale="ptBR"
                      />
                    ) : (
                      <>
                        <span style={pStyle}>
                          {a.quando ? moment(a.quando).format('DD [de] MMMM [de] YYYY') : ''}
                        </span>
                      </>
                    )}
                  </div>
                  <br />
                  <div className="form-group bmd-form-group is-filled">
                    <label htmlFor="1" className="bmd-label-static">
                      Quem?
                    </label>
                    {input === a._id ? (
                      <input
                        value={quem}
                        onChange={e => setQuem(e.target.value)}
                        type="text"
                        className="form-control"
                        id="1"
                      />
                    ) : (
                      <>
                        <span style={pStyle}>{a.quem}</span>
                      </>
                    )}
                  </div>
                  <br />
                  <div className="form-group bmd-form-group is-filled">
                    <label htmlFor="1" className="bmd-label-static">
                      Como?
                    </label>
                    {input === a._id ? (
                      <input
                        value={como}
                        onChange={e => setComo(e.target.value)}
                        type="text"
                        className="form-control"
                        id="1"
                      />
                    ) : (
                      <>
                        <span style={pStyle}>{a.como}</span>
                      </>
                    )}
                  </div>
                  <div className="row pull-right">
                    <div className="col-md-12">
                      {input !== a._id ? (
                        <button
                          onClick={() => handleEdit(a)}
                          type="button"
                          className="btn btn-success btn-sm btn-link"
                        >
                          <strong>
                            <i className="material-icons">add_circle_outline</i> Editar
                          </strong>
                        </button>
                      ) : (
                        <>
                          <div>
                            <button type="submit" className="btn btn-success btn-sm">
                              <strong>
                                <i className="material-icons">add_circle_outline</i> Adicionar nova
                                Ação
                              </strong>
                            </button>
                            <button
                              onClick={() => {
                                setInput('');
                                setId('');
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
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>
    </BlankPage>
  );
};

Aatuar30d.propTypes = {
  a30d: PropTypes.shape().isRequired,
  updateA30dRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  a30d: state.a30d,
});

const mapDispatchToProps = dispatch => bindActionCreators(A30dActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aatuar30d);
