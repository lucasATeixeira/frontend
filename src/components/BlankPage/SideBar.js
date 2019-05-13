import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SideBarContent from './SideBarContent';

const Sidebar = ({ user }) => (
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
          {user.email}
        </a>
      </div>
    </div>

    <SideBarContent />
  </div>
);

Sidebar.propTypes = {
  user: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Sidebar);
