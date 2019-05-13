import React from 'react';

export default function UpperNavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
        <div className="container">
          <div className="navbar-wrapper">
            <a className="navbar-brand" href="/">
              REAL Cultura Financeira
            </a>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar" />
            <span className="navbar-toggler-icon icon-bar" />
            <span className="navbar-toggler-icon icon-bar" />
          </button>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <a className="nav-link" href="/">
                  <i className="material-icons">lock</i>
                  {' '}
Esqueci Minha Senha
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="/" data-toggle="modal" data-target="#modal-default">
                  <i className="material-icons">person_add</i>
                  {' '}
Cadastro Para sair das Dívidas
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
