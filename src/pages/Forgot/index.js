import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';

import Upper from './Upper';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) return toast.error('Insira um email');
      setLoading(true);
      await api.post('api/forgot_password', { email: email.toLowerCase() });
      setSuccess(true);
      return setLoading(false);
    } catch (err) {
      toast.error(err.response.data.error);
      return setLoading(false);
    }
  };
  return (
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
                        <strong>
                          {!success ? 'INSIRA O EMAIL PARA RECUPERAR SUA SENHA' : 'SUCESSO'}
                        </strong>
                      </p>
                      <div className="card-footer justify-content-center" />

                      {!success ? (
                        <span className="bmd-form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">email</i>
                              </span>
                            </div>
                            <br />
                            <div className="unform">
                              <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Email..."
                              />
                            </div>
                          </div>
                        </span>
                      ) : (
                        <h5 className="text-center">
                          <strong>
                            UM EMAIL FOI ENVIADO PARA {email} COM TODAS INSTRUÇÕES PARA MUDAR SUA
                            SENHA`
                          </strong>
                        </h5>
                      )}
                    </div>

                    <br />

                    {!success && (
                      <div className="card-footer justify-content-center">
                        <button type="submit" className="btn btn-info btn-lg">
                          {loading ? (
                            <i className="fa fa-spinner fa-pulse" />
                          ) : (
                            <strong>RECUPERE SUA SENHA</strong>
                          )}
                        </button>
                      </div>
                    )}

                    <br />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
