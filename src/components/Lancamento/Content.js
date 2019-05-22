/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import CurrencyInput from 'react-currency-input';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ptBR', ptBR);

const Content = ({ active, categorias }) => {
  const [idCategoria, setIdCategoria] = useState('categoria');
  const [categoria, setCategoria] = useState(undefined);
  const [idItem, setIdItem] = useState('item');
  const [formaPagamento, setFormaPagamento] = useState('À Vista');
  const [vezes, setVezes] = useState(1);
  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [dataLancamento, setDataLancamento] = useState(new Date());

  useEffect(() => {
    setFormaPagamento('À Vista');
    setVezes(1);
    setValor(0);
    toast.success('Lançamento Realizado com Sucesso', { containerId: 'A' });
    // toast.error('Ocorreu um erro com o Lançamento: ', { containerId: 'B' });
  }, [categoria, idItem]);

  useEffect(() => {
    setIdCategoria('categoria');
    setIdItem('item');
    setCategoria(undefined);
    setFormaPagamento('À Vista');
    setVezes(1);
    setValor(0);
    setDescricao('');
  }, [active]);

  return (
    <>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-12">
            <div className="card-body">
              <form>
                <span className="bmd-form-group">
                  <select
                    onChange={e => setIdCategoria(e.target.value)}
                    value={idCategoria}
                    className="form-control"
                    data-style="select-with-transition"
                    data-size="7"
                    data-live-search="true"
                  >
                    <option value="categoria">{`CATEGORIA ${active.toUpperCase()}`}</option>
                    {categorias
                      .filter(c => c.tipo === active)
                      .map(c => (
                        <option key={c._id} value={c._id}>
                          {c.nome}
                        </option>
                      ))}
                  </select>
                </span>

                <span className="bmd-form-group">
                  <select
                    value={idItem}
                    onChange={e => setIdItem(e.target.value)}
                    className="form-control"
                    data-style="select-with-transition"
                    data-size="7"
                    data-live-search="true"
                  >
                    <option value="item">ITEM</option>
                    {categorias.map((c) => {
                      if (!(c._id === idCategoria)) return null;
                      return c.itens.map(i => (
                        <option key={i._id} value={i._id}>
                          {i.nome}
                        </option>
                      ));
                    })}
                  </select>
                </span>

                <div className="form-group has-feedback">
                  <span className="bmd-form-group">
                    <DatePicker
                      placeholderText="Data"
                      className="form-control"
                      selected={dataLancamento}
                      onChange={date => setDataLancamento(date)}
                      dateFormat="dd/MM/yyyy"
                      locale="ptBR"
                    />
                  </span>
                </div>

                <span className="bmd-form-group">
                  <div className="form-group has-feedback">
                    <span className="bmd-form-group">
                      <input
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        type="text"
                        placeholder="Nome do item"
                        className="form-control"
                      />
                    </span>
                  </div>
                </span>

                <span className="bmd-form-group">
                  <div className="form-group has-feedback">
                    <span className="bmd-form-group">
                      <CurrencyInput
                        value={valor}
                        onChangeEvent={(e, mv, fv) => setValor(fv)}
                        className="form-control"
                        decimalSeparator=","
                        thousandSeparator="."
                        precision="2"
                        prefix="R$"
                      />
                    </span>
                  </div>
                </span>

                <span className="bmd-form-group">
                  <select
                    value={formaPagamento}
                    onChange={e => setFormaPagamento(e.target.value)}
                    className="form-control "
                    data-style="select-with-transition"
                    data-size="7"
                    data-live-search="true"
                  >
                    <option value="À Vista">À Vista</option>
                    <option value="Recorrente">Recorrente</option>
                    <option value="Parcelado">Parcelado</option>
                  </select>
                </span>

                {formaPagamento !== 'À Vista' && (
                  <span className="bmd-form-group">
                    <div className="form-group has-feedback">
                      <input
                        className="form-control"
                        type="number"
                        value={vezes}
                        onChange={e => setVezes(e.target.value)}
                      />
                    </div>
                  </span>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <div className="modal-footer justify-content-center">
          <button
            type="button"
            className="btn btn-primary btn-link btn-wd btn-lg"
            data-dismiss="modal"
            aria-hidden
          >
            Fechar
          </button>
          <button type="button" className="btn btn-primary btn-link btn-wd btn-lg">
            Lançar
          </button>
        </div>
      </div>
      <ToastContainer enableMultiContainer containerId="A" autoClose={2000} />
      <ToastContainer enableMultiContainer containerId="B" autoClose={2000} />
    </>
  );
};

Content.propTypes = {
  active: PropTypes.string.isRequired,
  categorias: PropTypes.arrayOf(PropTypes.shape()),
};

Content.defaultProps = {
  categorias: [],
};

const mapStateToProps = state => ({
  categorias: state.categorias.categorias,
});

export default connect(mapStateToProps)(Content);
