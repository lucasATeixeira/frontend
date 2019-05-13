import React from 'react';

export default function Item() {
  return (
    <li className="nav-item">
      <a href="#lancamento" className="nav-link" data-toggle="modal" data-target="#lancamento">
        <i className="material-icons">add_circle</i>
        <p>Lançamento</p>
      </a>
    </li>
  );
}
