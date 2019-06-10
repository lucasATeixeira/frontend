import React from 'react';
import PropTypes from 'prop-types';
import TypeCard from './TypeCard';
import RadarChart from './RadarChart';
import BarChart from './BarChart';
import Info from './Info';

const PlanCard = ({ content }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <TypeCard />
            <Info content={content} />
            <RadarChart />
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  </div>
);

PlanCard.propTypes = {
  content: PropTypes.shape(),
};

PlanCard.defaultProps = {
  content: {},
};

export default PlanCard;
