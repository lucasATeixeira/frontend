import React, { useState } from 'react';

import Content from './Content';

const Lancamento = () => {
  const [active, setActive] = useState('gasto');

  return (
    <>
      <div className="modal fade" id="lancamento" tabIndex={-1}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="card card-signup card-plain">
              <div className="modal-header">
                <div className="card-header card-header-grafit text-center">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden>
                    <i className="material-icons">clear</i>
                  </button>
                  <h4 className="card-title">Lançamento</h4>
                  <div className="social-line">
                    <div className="page-categories">
                      <ul className="nav nav-pills justify-content-center" role="tablist">
                        <li className="nav-item">
                          <a
                            onClick={() => setActive('recebimento')}
                            className="nav-link btn-ie"
                            data-toggle="tab"
                            href="/painel"
                            role="tablist"
                          >
                            <i className="material-icons">attach_money</i>{' '}
                            <strong>Recebimento</strong>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            onClick={() => setActive('gasto')}
                            className="nav-link btn-ie active"
                            data-toggle="tab"
                            href="/painel"
                            role="tablist"
                          >
                            <i className="material-icons">shopping_cart</i> <strong>Gasto</strong>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Content active={active} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lancamento;
