/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Creators as PatrimoniosActions } from '../../store/ducks/patrimonios';

const TablePassivos = ({
  list,
  addPatrimonioRequest,
  removePatrimonioRequest,
  classificacao,
  updatePatrimonioRequest,
}) => {
  const [newPassivo, setNewPassivo] = useState(false);
  const [nomePassivo, setNomePassivo] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [pRestantes, setPRestantes] = useState(0);
  const [pmt, setPmt] = useState(0);
  const [taxa, setTaxa] = useState(0);
  const [aVista, setAVista] = useState(0);
  const [edit, setEdit] = useState('');

  const handleDelete = (patrimonio) => {
    if (!window.confirm('Tem certeza que deseja excluir este patrimônio?')) return;
    removePatrimonioRequest(patrimonio);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode !== 27) return;
    setNewPassivo(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomePassivo) return toast.error('Inclua um nome', { containerId: 'alerts' });
    if (!instituicao) return toast.error('Inclua um nome para Instituição', { containerId: 'alerts' });
    if (pRestantes <= 0) return toast.error('Inclua um valor de parcelas restantes válido', { containerId: 'alerts' });
    if (pmt <= 0) return toast.error('Inclua um valor de PMT válido', { containerId: 'alerts' });
    if (taxa < 0) return toast.error('Inclua um valor da taxa válido', { containerId: 'alerts' });
    if (aVista < 0) return toast.error('Inclua um valor à Vista válido', { containerId: 'alerts' });
    const data = moment();
    const dataFinal = moment()
      .add(pRestantes, 'months')
      .format();
    if (newPassivo) {
      setNewPassivo(false);
      setNomePassivo('');
      setInstituicao('');
      setPRestantes(0);
      setPmt(0);
      setTaxa(0);
      setAVista(0);
      setNewPassivo(false);
      return addPatrimonioRequest({
        nome: nomePassivo,
        tipo: 'passivo',
        classificacao,
        instituicao,
        pmt,
        data,
        dataFinal,
        taxa,
        aVista,
      });
    }

    if (!newPassivo) {
      setEdit('');
      setNomePassivo('');
      setInstituicao('');
      setPRestantes(0);
      setPmt(0);
      setTaxa(0);
      setAVista(0);
      setNewPassivo(false);
      return updatePatrimonioRequest({
        _id: edit,
        nome: nomePassivo,
        classificacao,
        instituicao,
        pmt,
        data,
        dataFinal,
        taxa,
        aVista,
      });
    }

    setNomePassivo('');
    setInstituicao('');
    setPRestantes(0);
    setPmt(0);
    setTaxa(0);
    setAVista(0);
    setNewPassivo(false);
    return setEdit('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-danger">
                      <strong>Passivo</strong>
                    </th>
                    <th className="text-danger">
                      <strong>Instituição</strong>
                    </th>
                    <th className="text-danger">
                      <strong>PMT</strong>
                    </th>
                    <th className="text-danger">
                      <strong>P. Restantes</strong>
                    </th>
                    <th className="text-danger">
                      <strong>Taxa</strong>
                    </th>
                    <th className="text-danger">
                      <strong>Saldo À Vista</strong>
                    </th>
                    <th className="text-danger">
                      <strong>Saldo Total</strong>
                    </th>
                    <th className="text-danger">
                      <strong>Desconto</strong>
                    </th>
                    <th className="text-right text-danger">
                      <strong>Actions</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(p => (
                    <tr key={p._id}>
                      {edit !== p._id ? (
                        <>
                          <td>{p.nome}</td>
                          <td>{p.instituicao}</td>
                          <td>
                            {p.pmt.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                          </td>
                          <td>{p.parcelas}</td>
                          <td>{p.taxa}%</td>
                          <td>
                            {p.aVista.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td>
                            {p.total.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td>{((1 - p.aVista / p.total) * 100).toLocaleString('pt-br')}%</td>
                          <td className="td-actions text-right">
                            <button
                              type="button"
                              className="btn btn-success btn-link btn-just-icon btn-sm"
                              onClick={() => {
                                setNewPassivo(false);
                                setNomePassivo(p.nome);
                                setInstituicao(p.instituicao);
                                setPRestantes(p.parcelas);
                                setPmt(p.pmt);
                                setTaxa(p.taxa);
                                setAVista(p.aVista);
                                setEdit(p._id);
                              }}
                            >
                              <i className="fa fa-pencil small" />
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              type="button"
                              className="btn btn-danger btn-link btn-just-icon btn-sm"
                            >
                              <i className="material-icons">close</i>
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <span className="bmd-form-group">
                              <input
                                value={nomePassivo}
                                onChange={e => setNomePassivo(e.target.value)}
                                type="text"
                                placeholder="Nome do Passivo"
                                className="form-control"
                              />
                            </span>
                          </td>
                          <td>
                            <span className="bmd-form-group">
                              <input
                                value={instituicao}
                                onChange={e => setInstituicao(e.target.value)}
                                type="text"
                                placeholder="Instituição"
                                className="form-control"
                              />
                            </span>
                          </td>
                          <td>
                            <span className="bmd-form-group">
                              <CurrencyInput
                                value={pmt}
                                onChangeEvent={(e, mv, fv) => setPmt(fv)}
                                className="form-control"
                                decimalSeparator=","
                                thousandSeparator="."
                                precision="2"
                                prefix="R$"
                              />
                            </span>
                          </td>
                          <td>
                            <span className="bmd-form-group">
                              <input
                                value={pRestantes}
                                onChange={e => setPRestantes(e.target.value)}
                                type="number"
                                placeholder="P. Restantes"
                                className="form-control"
                              />
                            </span>
                          </td>
                          <td>
                            <span className="bmd-form-group">
                              <CurrencyInput
                                value={taxa}
                                onChangeEvent={(e, mv, fv) => setTaxa(fv)}
                                className="form-control"
                                decimalSeparator=","
                                thousandSeparator="."
                                precision="2"
                                suffix="%"
                              />
                            </span>
                          </td>
                          <td>
                            <span className="bmd-form-group">
                              <CurrencyInput
                                value={aVista}
                                onChangeEvent={(e, mv, fv) => setAVista(fv)}
                                className="form-control"
                                decimalSeparator=","
                                thousandSeparator="."
                                precision="2"
                                prefix="R$"
                              />
                            </span>
                          </td>
                          <td className="text-center">
                            {(pRestantes * pmt).toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td className="text-center">
                            {isNaN((1 - aVista / (pRestantes * pmt)) * 100)
                              ? 0
                              : Math.round((1 - aVista / (pRestantes * pmt)) * 100)}
                            %
                          </td>
                          <td className="text-center">
                            <div>
                              <button
                                type="submit"
                                className="btn btn-success btn-link btn-just-icon btn-sm"
                              >
                                <i className="material-icons">add_circle_outline</i>
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}

                  {newPassivo && (
                    <tr>
                      <td>
                        <span className="bmd-form-group">
                          <input
                            value={nomePassivo}
                            onChange={e => setNomePassivo(e.target.value)}
                            type="text"
                            placeholder="Nome do Passivo"
                            className="form-control"
                          />
                        </span>
                      </td>
                      <td>
                        <span className="bmd-form-group">
                          <input
                            value={instituicao}
                            onChange={e => setInstituicao(e.target.value)}
                            type="text"
                            placeholder="Instituição"
                            className="form-control"
                          />
                        </span>
                      </td>
                      <td>
                        <span className="bmd-form-group">
                          <CurrencyInput
                            value={pmt}
                            onChangeEvent={(e, mv, fv) => setPmt(fv)}
                            className="form-control"
                            decimalSeparator=","
                            thousandSeparator="."
                            precision="2"
                            prefix="R$"
                          />
                        </span>
                      </td>
                      <td>
                        <span className="bmd-form-group">
                          <input
                            value={pRestantes}
                            onChange={e => setPRestantes(e.target.value)}
                            type="number"
                            placeholder="P. Restantes"
                            className="form-control"
                          />
                        </span>
                      </td>
                      <td>
                        <span className="bmd-form-group">
                          <CurrencyInput
                            value={taxa}
                            onChangeEvent={(e, mv, fv) => setTaxa(fv)}
                            className="form-control"
                            decimalSeparator=","
                            thousandSeparator="."
                            precision="2"
                            suffix="%"
                          />
                        </span>
                      </td>
                      <td>
                        <span className="bmd-form-group">
                          <CurrencyInput
                            value={aVista}
                            onChangeEvent={(e, mv, fv) => setAVista(fv)}
                            className="form-control"
                            decimalSeparator=","
                            thousandSeparator="."
                            precision="2"
                            prefix="R$"
                          />
                        </span>
                      </td>
                      <td className="text-center">
                        {(pRestantes * pmt).toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="text-center">
                        {isNaN((1 - aVista / (pRestantes * pmt)) * 100)
                          ? 0
                          : Math.round((1 - aVista / (pRestantes * pmt)) * 100)}
                        %
                      </td>
                      <td className="text-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-link btn-just-icon btn-sm"
                        >
                          <i className="material-icons">add_circle_outline</i>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <br />
            <button
              type="button"
              onClick={() => {
                setNewPassivo(true);
                setEdit('');
              }}
              className="btn btn-danger btn-sm"
            >
              <strong>
                <i className="material-icons">add_circle_outline</i> Adicionar passivo
              </strong>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

TablePassivos.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()),
  addPatrimonioRequest: PropTypes.func.isRequired,
  removePatrimonioRequest: PropTypes.func.isRequired,
  classificacao: PropTypes.string.isRequired,
  updatePatrimonioRequest: PropTypes.func.isRequired,
};

TablePassivos.defaultProps = {
  list: [],
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(PatrimoniosActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TablePassivos);
