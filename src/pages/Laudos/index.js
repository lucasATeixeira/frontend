import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BlankPage from '../../components/BlankPage';
import laudos from '../../services/laudosCrenca';

export default function Laudos({ location }) {
  const result = new URLSearchParams(location.search).get('result');
  const laudo = laudos[result];
  return (
    <BlankPage>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <Link to="/comportamento" className="material-icons">
                  arrow_back
                </Link>
                <h2>{result.toUpperCase()}</h2>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <blockquote>
                    <h4>"{laudo.phrase}"</h4>
                  </blockquote>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <strong>{laudo.abstract}</strong>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <p>{laudo.content}</p>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <h4>
                    <strong>COMO DESENVOLVER</strong>
                  </h4>
                  <ul>
                    {laudo.improvment.map(i => (
                      <li>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <h4>
                    <strong>QUESTIONE E REFLITA:</strong>
                  </h4>
                  <ol>
                    {laudo.questions.map(i => (
                      <li>{i}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlankPage>
  );
}

Laudos.propTypes = {
  location: PropTypes.shape(),
};

Laudos.defaultProps = {
  location: {},
};
