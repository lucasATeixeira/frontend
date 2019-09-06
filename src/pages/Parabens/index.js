import React from 'react';
import { Container, Card } from './styles';

export default function Parabens() {
  const query = new URLSearchParams(window.location.search);
  const paymentMethod = query.get('payment_method');
  return (
    <Container>
      <Card>
        <h1>Parabéns!</h1>
        <div>
          <p>
            Você deu o primeiro passo rumo à{' '}
            <span className="blue">sua conta no azul</span>
          </p>
          {paymentMethod !== 'boleto' ? (
            <p>
              Em alguns minutos você receberá no seu e-mail cadastrado algumas
              instruções para te ajudar no processo do{' '}
              <span className="blue">Ondazul</span>.
            </p>
          ) : (
            <p>
              Em alguns minutos você receberá no seu e-mail cadastrado o link
              para ter acesso ao seu boleto bancário do{' '}
              <span className="blue">Ondazul</span>.
            </p>
          )}
        </div>
        <span className="blue footer">Seja bem vindo! #boraREALizar</span>
      </Card>
    </Container>
  );
}
