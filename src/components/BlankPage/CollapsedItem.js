import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CollapsedItem({
  icon, title, idColapse, itens, setPage,
}) {
  const [active, setActive] = useState('');
  return (
    <>
      <li className={`nav-item ${active}`}>
        <a className="nav-link" data-toggle="collapse" href={`#${idColapse}`}>
          <i className="material-icons">{icon}</i>
          <p>
            {title}
            <b className="caret" />
          </p>
        </a>
      </li>

      <div className={`collapse ${active === 'active' ? 'show' : ''}`} id={idColapse}>
        <ul className="nav">
          {itens.map((item) => {
            if (window.location.pathname === item.href && active === '') {
              setActive('active');
              setPage(item.title);
            }
            return (
              <li
                key={Math.random()}
                className={`nav-item ${window.location.pathname === item.href ? 'active' : ''}`}
              >
                <Link to={item.href} className="nav-link">
                  <span className="sidebar-normal"> {item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

CollapsedItem.propTypes = {
  setPage: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  idColapse: PropTypes.string.isRequired,
  itens: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      mini: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};
