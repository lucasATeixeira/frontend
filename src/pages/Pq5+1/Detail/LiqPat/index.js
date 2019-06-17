import React from 'react';
import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';

const LiqPat = () => (
  <>
    <div className="row">
      <div className="col-md-6">
        <One />
      </div>
      <div className="col-md-6">
        <Two />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <Three />
      </div>
      <div className="col-md-6">
        <Four />
      </div>
    </div>
  </>
);

export default LiqPat;
