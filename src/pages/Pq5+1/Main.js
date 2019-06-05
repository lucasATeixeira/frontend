import React, { useState } from 'react';
import PlanCard from './PlanCard';
import NewPlan from './NewPlan';

const Main = () => {
  const [newPlan, setNewPlan] = useState(false);
  return (
    <>
      <PlanCard />

      {newPlan && (
        <>
          <NewPlan />
          <div className="row">
            <div className="col-md-12">
              <button
                onClick={() => setNewPlan(false)}
                className="btn btn-round pull-right btn-success pull-left"
                type="button"
              >
                <strong>Voltar</strong>
              </button>
            </div>
          </div>
        </>
      )}
      {!newPlan && (
        <div className="row">
          <div className="col-md-12">
            <button
              onClick={() => setNewPlan(true)}
              className="btn btn-round pull-right btn-success pull-left"
              type="button"
            >
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
