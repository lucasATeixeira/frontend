import React from 'react';
import Upper from './Upper';

export default function Login() {
  return (
    <>
      <Upper />
      <div className="wrapper wrapper-full-page">
        <div
          className="page-header error-page header-filter"
          filter-color="black"
          style={{
            backgroundImage: "url('assets/img/realeasy.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <div className="content-center">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">404</h1>
                <h2>Página não encontrada :(</h2>
                <h4>Ooopss! Parece que você se perdeu...</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
