import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Pote from './Pote';
import { Footer } from './style';

export default function Mapear() {
  const [barData, setBarData] = useState({});

  const orcamento = useSelector(state => state.categorias);

  const patrimonios = useSelector(state => state.patrimonios);

  const maxOrcado = useMemo(
    () =>
      orcamento.gastosOrcados +
      orcamento.recebimentosOrcados +
      orcamento.gastosRealizadosParcelados +
      patrimonios.passivos.pmt,
    [orcamento, patrimonios]
  );

  useEffect(() => {
    setBarData({
      labels: ['Orçado'],
      datasets: [
        {
          label: 'Recebimentos',
          data: [
            orcamento.recebimentosOrcados +
              orcamento.recebimentosRealizadosParcelados,
          ],
          backgroundColor: 'transparent',
          borderColor: 'rgb(63, 76, 107)',
          borderWidth: 3,
          yAxisID: 'right',
        },
        {
          label: 'Dívidas',
          data: [
            patrimonios.passivos.pmt + orcamento.gastosRealizadosParcelados,
          ],
          backgroundColor: 'rgb(218, 68, 83)',
          borderColor: 'transparent',
          borderWidth: 3,
        },
        {
          label: 'Gastos',
          data: [orcamento.gastosOrcados],
          backgroundColor: 'rgb(0, 87, 156)',
          borderColor: 'transparent',
          borderWidth: 3,
        },
      ],
    });
  }, [orcamento, patrimonios]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <strong>Mapear</strong>
        </h3>
        <p className="category">Orçamento</p>
      </div>
      <div className="card-body">
        <div style={{ marginBottom: '40px' }} className="row">
          <div
            className="col-md-7"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="text-grafit">
                      <strong>Recebimentos</strong>
                    </td>
                    <td>
                      {orcamento.recebimentosOrcados.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-info">
                      <strong>Gastos</strong>
                    </td>
                    <td>
                      {orcamento.gastosOrcados.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-danger">
                      <strong>Dívidas</strong>
                    </td>
                    <td>
                      {(
                        orcamento.gastosRealizadosParcelados +
                        patrimonios.passivos.pmt
                      ).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-5">
            <Pote barData={barData} max={maxOrcado} />
          </div>
        </div>
        <Footer
          red={
            orcamento.recebimentosOrcados <
            orcamento.gastosOrcados +
              orcamento.gastosRealizadosParcelados +
              patrimonios.passivos.pmt
          }
        >
          <span className="left">
            No{' '}
            {orcamento.recebimentosOrcados <
            orcamento.gastosOrcados +
              orcamento.gastosRealizadosParcelados +
              patrimonios.passivos.pmt
              ? 'Vermelho'
              : 'Azul'}
            :
          </span>
          <span className="right">
            {Math.abs(
              orcamento.recebimentosOrcados -
                orcamento.gastosOrcados +
                orcamento.gastosRealizadosParcelados +
                patrimonios.passivos.pmt
            ).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </Footer>
      </div>
    </div>
  );
}
