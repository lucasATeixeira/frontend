import React from 'react';
import Options from './Options';

const NewPlan = () => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <Options type="eg" title="Enxugar Gastos" icon="colorize" destaque />
        <Options type="lp" title="Liquidação Patrimonial" icon="business" />
        <Options type="ea" title="Empréstimo entre Amigos" icon="group" />
        <Options type="re" title="Recebimentos Extras" icon="attach_money" />
        <Options type="cd" title="Consolidação de dívidas" icon="file_copy" />
      </div>
    </div>
  </div>
);

export default NewPlan;
