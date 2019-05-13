import React from 'react';
import { Link } from 'react-router-dom';
import PropTyps from 'prop-types';

export default function Item({ href, title, icon }) {
  return (
    <li className={`nav-item ${window.location.pathname === href ? 'active' : ''}`}>
      <Link to={href} className="nav-link">
        <i className="material-icons">{icon}</i>
        <p>{title}</p>
      </Link>
    </li>
  );
}

Item.propTypes = {
  href: PropTyps.string.isRequired,
  title: PropTyps.string.isRequired,
  icon: PropTyps.string.isRequired,
};
