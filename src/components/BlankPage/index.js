import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { Creators as DataActions } from '../../store/ducks/data';
import Wrapper from './Wrapper';
import SideBar from './SideBar';
import MainPanel from './MainPanel';
import TopNavBar from './TopNavBar';
import Lancamento from '../Lancamento';

const BlankPage = ({ children, fetchDataRequest, data }) => {
  const [page, setPage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('@Ondazul: data')) {
      fetchDataRequest();
    }
  }, [fetchDataRequest]);

  return (
    <>
      <Wrapper>
        <ToastContainer
          autoClose={2000}
          enableMultiContainer
          containerId="alerts"
        />
        <SideBar setPage={setPage} />
        <MainPanel>
          <TopNavBar page={page} />
          <div className="content">
            <div className="container-fluid">
              {data.loading ? (
                <>
                  <h2>
                    <i className="fa fa-spinner fa-pulse" />
                    Carregando
                  </h2>
                </>
              ) : (
                <>
                  {children}
                  <Lancamento />
                </>
              )}
            </div>
          </div>
        </MainPanel>
      </Wrapper>
    </>
  );
};

BlankPage.propTypes = {
  children: PropTypes.node,
  fetchDataRequest: PropTypes.func.isRequired,
  data: PropTypes.shape({
    err: PropTypes.bool,
    loading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
};

BlankPage.defaultProps = {
  children: '',
};

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(DataActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlankPage);
