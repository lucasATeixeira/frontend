import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function Almejar() {
  const v5 = useSelector(state => state.v5.v5);
  const v1 = useSelector(state => state.v1.v1);

  const dreams = useMemo(() => v1.concat(v5), [v1, v5]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <strong>Almejar</strong>
        </h3>
        <p className="category">Aonde você quer chegar</p>
      </div>
      <div className="card-body">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            {dreams.map((dream, index) => (
              <li
                key={dream._id}
                data-target="#carouselExampleIndicators"
                data-slide-to={index}
                className={index === 0 ? 'active' : ''}
              />
            ))}
          </ol>
          <div className="carousel-inner">
            {dreams.map((dream, index) => (
              <div
                key={dream._id}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
              >
                <img
                  className="d-block w-100"
                  src={dream.image_url}
                  alt="First slide"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>
                    <strong>{dream.title}</strong>
                  </h5>
                  <p>
                    <strong>{dream.description}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}
