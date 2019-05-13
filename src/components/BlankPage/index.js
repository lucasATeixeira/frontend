import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import SideBar from './SideBar';
import MainPanel from './MainPanel';
import TopNavBar from './TopNavBar';
// import Lancamento from '../Lancamento';

export default function Painel({ children }) {
  return (
    <>
      <Wrapper>
        <SideBar />
        <MainPanel>
          <TopNavBar />
          <div className="content">
            <div className="container-fluid">
              {children}
              {/* <Lancamento data={data} /> */}
            </div>
          </div>
        </MainPanel>
      </Wrapper>
    </>
  );
}

Painel.propTypes = {
  children: PropTypes.node,
};

Painel.defaultProps = {
  children: '',
};
