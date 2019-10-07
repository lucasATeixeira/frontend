import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function LoginPage({ children, upperContent }) {
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
              {upperContent.map(item => (
                <li className="nav-item ">
                  <Link className="nav-link" to={item.href}>
                    <i className="material-icons">{item.icon}</i>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
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
          <div className="container">{children}</div>
        </div>
      </div>
    </>
  );
}

LoginPage.propTypes = {
  children: PropTypes.node.isRequired,
  upperContent: PropTypes.arrayOf(PropTypes.shape()),
};

LoginPage.defaultProps = {
  upperContent: [],
};
