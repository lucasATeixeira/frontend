import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Upper from './Upper';
import 'react-toastify/dist/ReactToastify.css';

const Reset = ({ location }) => {
  const query = new URLSearchParams(location.search);
  const email = query.get('email');
  const token = query.get('token');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!password || !repeatPassword)
      return toast.error('Preencha todos os campos');
    if (password !== repeatPassword)
      return toast.error('As Senhas não são iguais');
    try {
      setLoading(true);
      await api.post('api/reset_password', { email, password, token });
      setSuccess(true);
      return setLoading(false);
    } catch (err) {
      toast.error(err.response.data.error);
      return setLoading(false);
    }
  };

  return (
    <>
      {!email || !token ? (
        <Redirect to="/" />
      ) : (
        <>
          <ToastContainer autoClose={2000} />
          <Upper />
          <div className="wrapper wrapper-full-page">
            <div
              className="page-header login-page header-filter"
              filter-color="black"
              style={{
                backgroundImage: "url('assets/img/realeasy.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
                    <form onSubmit={handleSubmit}>
                      <div className="card card-login">
                        <div className="card-header card-header-info text-center">
                          <h4 className="card-title">ONDAZUL</h4>
                        </div>
                        <br />

                        <div className="card-body">
                          <p className="card-description text-center">
                            <strong>INSIRA A NOVA SENHA DESEJADA</strong>
                          </p>
                          <div className="card-footer justify-content-center" />

                          {!success ? (
                            <>
                              <span className="bmd-form-group">
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="material-icons">
                                        lock_outline
                                      </i>
                                    </span>
                                  </div>
                                  <br />
                                  <div className="unform">
                                    <input
                                      type="password"
                                      value={password}
                                      onChange={e =>
                                        setPassword(e.target.value)
                                      }
                                      className="form-control"
                                      placeholder="Nova Senha..."
                                    />
                                  </div>
                                </div>
                              </span>
                              <span className="bmd-form-group">
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="material-icons">
                                        lock_outline
                                      </i>
                                    </span>
                                  </div>
                                  <br />
                                  <div className="unform">
                                    <input
                                      type="password"
                                      value={repeatPassword}
                                      onChange={e =>
                                        setRepeatPassword(e.target.value)
                                      }
                                      className="form-control"
                                      placeholder="Confirme sua nova Senha"
                                    />
                                  </div>
                                </div>
                              </span>
                            </>
                          ) : (
                            <h5 className="text-center">
                              <strong>SENHA ALTERADA COM SUCESSO</strong>
                            </h5>
                          )}
                        </div>

                        <br />

                        <div className="card-footer justify-content-center">
                          {!success ? (
                            <button
                              type="submit"
                              className="btn btn-info btn-lg"
                            >
                              {loading ? (
                                <i className="fa fa-spinner fa-pulse" />
                              ) : (
                                <strong>REDEFINA SUA SENHA</strong>
                              )}
                            </button>
                          ) : (
                            <Link to="/" className="btn btn-info btn-lg">
                              <strong>FAZER O LOGIN</strong>
                            </Link>
                          )}
                        </div>

                        <br />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Reset.propTypes = {
  location: PropTypes.shape().isRequired,
};

export default Reset;
