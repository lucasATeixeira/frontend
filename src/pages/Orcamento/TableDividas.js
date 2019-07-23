import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TableDividas = ({ patrimonios }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Passivo</th>
              <th>Instituição</th>
              <th>Parcelas Restantes</th>
              <th>Taxa</th>
              <th>Valor Parcelas</th>
              <th>Saldo Total</th>
            </tr>
          </thead>
          <tbody>
            {patrimonios.map(p => (
              <tr key={p._id}>
                <td>{p.nome}</td>
                <td>{p.instituicao}</td>
                <td>{p.parcelas}</td>
                <td>{p.taxa}%</td>
                <td>{p.pmt.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                <td>{p.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

TableDividas.propTypes = {
  patrimonios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  patrimonios: state.patrimonios.passivos.list,
});

export default connect(mapStateToProps)(TableDividas);
