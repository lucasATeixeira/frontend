import React from 'react';
import { Container, Card } from './styles';

export default function Parabens() {
  return (
    <Container>
      <Card>
        <h1>Parabéns!</h1>
        <div>
          <p>
            Você deu o primeiro passo rumo à{' '}
            <span className="blue">sua conta no azul</span>
          </p>
          <p>
            Em alguns minutos você receberá no seu e-mail cadastrado o link para
            acessar o sistema <span className="blue">Ondazul</span>.
          </p>
        </div>
        <span className="blue footer">Seja bem vindo! #boraREALizar</span>
      </Card>
    </Container>
  );
}
