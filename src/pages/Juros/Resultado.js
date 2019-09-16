import React from 'react';
import { Line } from 'react-chartjs-2';
import { ResultadoContainer } from './style';

export default function Resultado() {
  return (
    <ResultadoContainer>
      <div className="pmt">
        Total em Parcelas
        <span>R$ 100,00</span>
      </div>

      <div className="tempo">
        Tempo até você sair das dívidas
        <div className="grafico">
          <Line />
        </div>
      </div>

      <button className="btn btn-info pull-right" type="button">
        <strong>Veja como ficar no azul</strong>
      </button>
    </ResultadoContainer>
  );
}
