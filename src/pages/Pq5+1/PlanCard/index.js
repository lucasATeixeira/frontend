import React from 'react';
import TypeCard from './TypeCard';
import RadarChart from './RadarChart';
import BarChart from './BarChart';
import Info from './Info';

const PlanCard = () => (
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <TypeCard />
            <Info />
            <RadarChart />
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlanCard;
