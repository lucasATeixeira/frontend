import React from 'react';

export default function Text() {
  return (
    <>
      <h2 className="text-info">Calculadora de Juros</h2>
      <p>
        O primeiro passo pra sair do escuro é acender a luz ;). Agora você vai
        ter a oportunidade de descobrir o total das suas dívidas e quando elas
        acabam. Basta ir clicando no <span className="text-info">+</span> e
        incluir os dados da suas dívidas. No final{' '}
        <span className="text-info">clica no botão</span> para saber quanto você
        paga em juros{' '}
        <span className="text-info">e o que fazer pra se livrar dos juros</span>
      </p>
    </>
  );
}
