import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Creators as UserActions } from '../../store/ducks/user';
import { Creators as DataActions } from '../../store/ducks/data';
import 'react-datepicker/dist/react-datepicker.css';

const style = {
  background: 'none',
  outline: 'none',
  border: 'none',
  margin: '20px',
  cursor: 'pointer',
};

const TopNavbar = ({
  logout, history, page, categorias, fetchDataRequest,
}) => {
  const [checked, setChecked] = useState(categorias.periodo > 1);
  const [start, setStart] = useState(new Date(categorias.start));
  const [end, setEnd] = useState(new Date(categorias.end));
  const handleStart = (e) => {
    setStart(e);
    if (!checked) return fetchDataRequest(e, e);
    return fetchDataRequest(e, end);
  };
  const handleEnd = (e) => {
    if (e < start) return alert('Coloque uma data superior a do começo');
    setEnd(e);
    return fetchDataRequest(start, e);
  };
  const handleMonthPick = () => {
    fetchDataRequest(start, end);
  };
  const handleLogout = () => {
    localStorage.clear();
    logout();
    history.push('/');
  };

  useEffect(() => {
    if (end < start) {
      setEnd(start);
    }
  }, [start, end]);
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
            {!checked && (
              <li className="nav-item">
                <DatePicker
                  selected={start}
                  className="form-control"
                  onChange={handleStart}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
              </li>
            )}
            {checked && (
              <li className="nav-item">
                <DatePicker
                  selected={start}
                  selectsStart
                  className="form-control"
                  startDate={start}
                  endDate={end}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  onChange={handleStart}
                />

                <DatePicker
                  selected={end}
                  selectsEnd
                  className="form-control"
                  startDate={start}
                  endDate={end}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  onChange={handleEnd}
                />
                {false && (
                  <button style={style} onClick={handleMonthPick} type="button">
                    <i className="fa fa-check-circle" />
                  </button>
                )}
              </li>
            )}
            <li className="nav-item">
              <div className="form-check">
                <label htmlFor="check" className="form-check-label">
                  <input
                    id="check"
                    className="form-check-input"
                    type="checkbox"
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                    onChange={() => {
                      setChecked(!checked);
                      if (checked) return fetchDataRequest(start, start);
                      return fetchDataRequest(start, end);
                    }}
                  />
                  Intervalo
                  <span className="form-check-sign">
                    <span className="check" />
                  </span>
                </label>
              </div>
            </li>
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
  categorias: PropTypes.shape().isRequired,
  fetchDataRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categorias: state.categorias,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...UserActions, ...DataActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavbar);
