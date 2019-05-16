import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as UserActions } from '../../store/ducks/user';

const TopNavbar = ({ logout, history, page }) => {
  const handleLogout = () => {
    localStorage.clear();
    logout();
    history.push('/');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <div className="navbar-minimize">
            <button
              type="button"
              // id="minimizeSidebar"
              className="btn btn-just-icon btn-white btn-fab btn-round"
            >
              <i className="material-icons text_align-center visible-on-sidebar-regular">
                more_vert
              </i>
              <i className="material-icons design_bullet-list-67 visible-on-sidebar-mini">
                view_list
              </i>
            </button>
          </div>
          <a className="navbar-brand" href="/painel">
            {page}
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
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="/painel"
                id="navbarDropdownProfile"
                data-toggle="dropdown"
                aria-haspopup
                aria-expanded={false}
              >
                <i className="material-icons">person</i>
                <p className="d-lg-none d-md-block">Account</p>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdownProfile"
              >
                <a onClick={handleLogout} className="dropdown-item" href="/">
                  <strong>Sair</strong>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

TopNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavbar);
