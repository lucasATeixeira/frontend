import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BlankPage from '../../components/BlankPage';
import laudos from '../../services/laudosCrenca';

export default function Laudos({ location }) {
  let result = new URLSearchParams(location.search).get('result');
  const title = result;
  if (result === 'causa e efeito') result = 'causaEfeito';
  if (result === 'carencia emocional') result = 'carenciaEmocional';
  if (result === 'insatisfação pessoal') result = 'insatisfacaoPessoal';
  if (result === 'identificação externa') result = 'identificacaoExterna';

  const laudo = laudos[result];

  const textStyle = { fontSize: '17px', lineHeight: 2, textIndent: '2%' };
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
                <h2>{title.toUpperCase()}</h2>
              </div>
              {laudo.phrase && (
                <div style={{ marginTop: '40px' }} className="row">
                  <div className="col-md-12">
                    <blockquote>
                      <h3>&quot;{laudo.phrase}&quot;</h3>
                    </blockquote>
                  </div>
                </div>
              )}
              {laudo.abstract && (
                <div style={{ marginBottom: '20px' }} className="row">
                  <div className="col-md-12">
                    <strong style={{ fontSize: '18px' }}>
                      {laudo.abstract}
                    </strong>
                  </div>
                </div>
              )}
              <br />
              <div className="row">
                <div className="col-md-12">
                  {laudo.content.split(/[\n|\n\r]/).map(c => (
                    <p key={c} style={textStyle}>
                      {c}
                    </p>
                  ))}
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <h3>
                    <strong className="text-info">COMO DESENVOLVER</strong>
                  </h3>
                  <ul>
                    {laudo.improvment.map(i => (
                      <li style={textStyle} key={Math.random()}>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <br />
              {laudo.questions.lenght && (
                <div className="row">
                  <div className="col-md-12">
                    <h3>
                      <strong>QUESTIONE E REFLITA:</strong>
                    </h3>
                    <ol>
                      {laudo.questions.map(i => (
                        <li style={textStyle} key={Math.random()}>
                          {i}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
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
