import React from 'react';

const TypeCard = () => (
  <div className="col-md-3">
    <div className="card card-pricing bg-success">
      <div className="card-body ">
        <div className="card-icon">
          <i className="material-icons">business</i>
        </div>
        <h3 className="card-title">$69</h3>
        <p className="card-description">
          This is good if your company size is between 11 and 99 Persons.
        </p>
        <a href="#pablo" className="btn btn-white btn-round">
          Choose Plan
        </a>
      </div>
    </div>
  </div>
);

export default TypeCard;
