import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SideBarContent from './SideBarContent';

function Sidebar({ user, setPage }) {
  let { nome } = user;
  if (user.nomeConjuge) {
    nome = `${nome.split(' ')[0]} e ${user.nomeConjuge.split(' ')[0]}`;
  }
  return (
    <div className="sidebar" data-color="green" data-background-color="black">
      <div className="logo">
        <a href="/painel" className="simple-text logo-mini">
          O
        </a>
        <a href="/painel" className="simple-text logo-normal">
          OndAzul
        </a>
      </div>

      <div className="user">
        <div className="photo">{/* IMAGEM DO CLIENTE ATI */}</div>

        <div className="user-info">
          <a href="/painel" className="username">
            <strong>{nome}</strong>
          </a>
        </div>
      </div>

      <SideBarContent setPage={setPage} />
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape().isRequired,
  setPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Sidebar);
