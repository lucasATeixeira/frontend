/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import CurrencyInput from 'react-currency-input';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Creators as CategoriasActions } from '../../store/ducks/categorias';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ptBR', ptBR);

const Content = ({ active, categorias, lancamentoRequest, success, err }) => {
  const [idCategoria, setIdCategoria] = useState('categoria');
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
  }, [idCategoria, idItem]);

  useEffect(() => {
    if (success)
      toast.success('Lançamento Realizado', { containerId: 'lancamento' });
    if (err)
      toast.error('Ocorreu um erro com o lançamento', {
        containerId: 'lancamento',
      });
  }, [success, err]);

  useEffect(() => {
    setIdCategoria('categoria');
    setIdItem('item');
    setFormaPagamento('À Vista');
    setVezes(1);
    setValor(0);
    setDescricao('');
  }, [active]);

  const handleSubmit = e => {
    e.preventDefault();
    if (idCategoria === 'categoria') {
      return toast.error('Escolha uma categoria');
    }
    if (idItem === 'item') {
      return toast.error('Escolha um item');
    }
    if (!descricao) {
      return toast.error('Coloque uma descrição');
    }
    if (valor <= 0) {
      return toast.error('Coloque um valor do Lançamento');
    }
    if (vezes <= 0) {
      return toast.error('A quantidade de vezes deve ser superior a zero');
    }
    const dataFinal = moment(dataLancamento)
      .add(Number(vezes) - 1, 'month')
      .format();

    return lancamentoRequest({
      tipo: active,
      idCategoria,
      idItem,
      data: dataLancamento,
      descricao,
      valor,
      formaPagamento,
      vezes,
      dataFinal,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-12">
              <div className="card-body">
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
                    {categorias.map(c => {
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
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-info btn-link btn-wd btn-lg"
              data-dismiss="modal"
              aria-hidden
            >
              Fechar
            </button>
            <button
              type="submit"
              className="btn btn-info btn-link btn-wd btn-lg"
            >
              Lançar
            </button>
          </div>
        </div>
        <ToastContainer
          enableMultiContainer
          containerId="lancamento"
          autoClose={2000}
        />
      </form>
    </>
  );
};

Content.propTypes = {
  active: PropTypes.string.isRequired,
  categorias: PropTypes.arrayOf(PropTypes.shape()),
  err: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  lancamentoRequest: PropTypes.func.isRequired,
};

Content.defaultProps = {
  categorias: [],
};

const mapStateToProps = state => ({
  categorias: state.categorias.categorias,
  success: state.categorias.success,
  err: state.categorias.err,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoriasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
