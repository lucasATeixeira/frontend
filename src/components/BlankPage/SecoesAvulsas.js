import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from './ModalSecoesAvulsas';

export default function SecoesAvulsas() {
  const user = useSelector(state => state.user.user);

  const [modal, setModal] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.pagar.me/checkout/1.1.0/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {modal && <Modal setModal={setModal} />}
      <button
        style={{ marginLeft: '14px' }}
        type="button"
        className="btn btn-info"
        onClick={() => setModal(true)}
      >
        <strong>Seções Avulsas</strong>
      </button>
    </>
  );
}
