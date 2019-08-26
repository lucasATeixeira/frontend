import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input } from '@rocketseat/unform';
import { ToastContainer, toast } from 'react-toastify';
import { Creators as UserActions } from '../../store/ducks/user';
import Upper from './Upper';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ loginRequest, loading, err, success, history }) => {
  useEffect(() => {
    if (err) toast.error(err);
    if (success) {
      if (!history.location.state) {
        history.push('/painel');
      } else {
        history.push(history.location.state.from.pathname);
      }
    }
  }, [err, success, history]);
  const handleSubmit = data => {
    const { email, senha } = data;
    loginRequest(email, senha);
  };

  return !success && localStorage.getItem('@Ondazul: token') ? (
    <Redirect to="/painel" />
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
                <div className="card card-login">
                  <div className="card-header card-header-info text-center">
                    <h4 className="card-title">ONDAZUL</h4>
                  </div>
                  <br />

                  <Form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <p className="card-description text-center">
                        <strong>FAÇA O LOGIN</strong>
                      </p>
                      <div className="card-footer justify-content-center" />

                      <span className="bmd-form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">email</i>
                            </span>
                          </div>
                          <br />
                          <div className="unform">
                            <Input
                              name="email"
                              className="form-control"
                              placeholder="Email..."
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
                            <Input
                              name="senha"
                              type="password"
                              className="form-control"
                              placeholder="Password..."
                            />
                          </div>
                        </div>
                      </span>
                    </div>

                    <br />

                    <div className="card-footer justify-content-center">
                      <button type="submit" className="btn btn-info btn-lg">
                        {loading ? (
                          <i className="fa fa-spinner fa-pulse" />
                        ) : (
                          <strong>Vamos Lá!</strong>
                        )}
                      </button>
                    </div>
                  </Form>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  err: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  loading: state.user.loading,
  success: state.user.success,
  err: state.user.err,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
