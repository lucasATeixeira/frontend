import React from 'react';
import Options from './Options';

const NewPlan = () => (
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <Options
              type="lp"
              title="Liquidação Patrimonial"
              icon="business"
              description="descrição aqui"
            />
            <Options
              type="ea"
              title="Empréstimo entre Amigos"
              icon="group"
              description="descrição aqui"
            />
            <Options
              type="re"
              title="Recebimentos Extras"
              icon="attach_money"
              description="descrição aqui"
            />
            <Options
              type="cd"
              title="Consolidação de dívidas"
              icon="file_copy"
              description="descrição aqui"
            />
            <Options
              type="eg"
              title="Enxugar Gastos"
              icon="colorize"
              description="descrição aqui"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NewPlan;
