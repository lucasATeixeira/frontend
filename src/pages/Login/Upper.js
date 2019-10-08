import React from 'react';
import { Link } from 'react-router-dom';

export default function UpperNavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
        <div className="container">
          <div className="navbar-wrapper">
            <Link className="navbar-brand" to="/">
              ONDAZUL
            </Link>
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
                <Link className="nav-link" to="/esqueci_minha_senha">
                  <i className="material-icons">lock</i>
                  ESQUECI MINHA SENHA
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
