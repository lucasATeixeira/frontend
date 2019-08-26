import React from 'react';
import Upper from './Upper';

export default function FreeMmd() {
  return (
    <>
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
                <form>
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
                      <>
                        <span className="bmd-form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">lock_outline</i>
                              </span>
                            </div>
                            <br />
                            <div className="unform">
                              <input
                                type="password"
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
                                <i className="material-icons">lock_outline</i>
                              </span>
                            </div>
                            <br />
                            <div className="unform">
                              <input
                                type="password"
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
                    </div>

                    <br />

                    <div className="card-footer justify-content-center">
                      <button type="submit" className="btn btn-info btn-lg">
                        <i className="fa fa-spinner fa-pulse" />
                        <strong>REDEFINA SUA SENHA</strong>
                      </button>
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
  );
}
