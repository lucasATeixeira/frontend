import React, { useState, useMemo, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import BlankPage from '../../components/BlankPage';
import Card from './Card';
import Content from './Content';
import ContentDividas from './ContentDividas';

const Orcamento = ({ categorias, patrimonios }) => {
  const [active, setActive] = useState(2);  

  const ref1 = createRef();
  const ref2 = createRef();

  const calculo = useMemo(() => {
    const c = {
      gFlex: 0,
      gEvent: 0,
      gComp: 0,
      rFlex: 0,
      rEvent: 0,
      rComp: 0,
    };
    categorias.categorias.forEach(cat => cat.itens.forEach((i) => {
      c.gFlex += i.tipo === 'gasto' ? (i.classificacao === 'Flexível' ? i.mensal : 0) : 0;
      c.gEvent += i.tipo === 'gasto' ? (i.classificacao === 'Eventual' ? i.mensal : 0) : 0;
      c.gComp += i.tipo === 'gasto' ? (i.classificacao === 'Comprometido' ? i.mensal : 0) : 0;
      c.rFlex += i.tipo === 'recebimento' ? (i.classificacao === 'Flexível' ? i.mensal : 0) : 0;
      c.rEvent += i.tipo === 'recebimento' ? (i.classificacao === 'Eventual' ? i.mensal : 0) : 0;
      c.rComp
          += i.tipo === 'recebimento' ? (i.classificacao === 'Comprometido' ? i.mensal : 0) : 0;
    }));    
    return c;
  }, [categorias]);

  return (
    <BlankPage>
      <div className="row">
        <div className="col-md-4">
          <Card
            setActive={setActive}
            type={1}
            title={categorias.recebimentosOrcados.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
            textColor="text-grafit"
            info="Recebimentos"
            materialIcon=""
            color="grafit"
            footerText={(
              <div style={{ width: '100%' }} className="form-group">
                <select ref={ref1} className="form-control selectpicker" data-style="btn btn-link">
                  <option>Mais detalhes</option>
                  <option disabled>
                    Soma dos Flexíveis:{' '}
                    {calculo.rFlex.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </option>
                  <option disabled>
                    Soma dos Comprometidos:{' '}
                    {calculo.rComp.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </option>
                  <option disabled>
                    Soma dos Eventuais:{' '}
                    {calculo.rEvent.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </option>
                </select>
              </div>
)}
          />
        </div>
        <div className="col-md-4">
          <Card
            setActive={setActive}
            type={2}
            title={categorias.gastosOrcados.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
            textColor="text-info"
            faIcon="fa-shopping-cart"
            materialIcon=""
            info="Gastos"
            footerText={(
              <div style={{ width: '100%' }} className="form-group">
                <select ref={ref2} className="form-control selectpicker" data-style="btn btn-link">
                  <option>Mais detalhes</option>
                  <option disabled>
                    Soma dos Flexíveis:{' '}
                    {calculo.gFlex.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </option>
                  <option disabled>
                    Soma dos Comprometidos:{' '}
                    {calculo.gComp.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </option>
                  <option disabled>
                    Soma dos Eventuais:{' '}
                    {calculo.gEvent.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </option>
                </select>
              </div>
)}
          />
        </div>
        <div className="col-md-4">
          <Card
            setActive={setActive}
            type={3}
            title={(
              categorias.gastosRealizadosParcelados + patrimonios.passivos.pmt
            ).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
            textColor="text-danger"
            faIcon="fa-files-o"
            materialIcon="file_copy"
            info="Parcelamentos"
            color="danger"
          />
        </div>
      </div>

      {active === 1 && (
        <Content
          categorias={categorias.categorias.filter(categoria => categoria.tipo === 'recebimento')}
          color="grafit"
          materialIcon="attach_money"
        />
      )}
      {active === 2 && (
        <Content
          categorias={categorias.categorias.filter(categoria => categoria.tipo === 'gasto')}
          color="info"
          materialIcon="shopping_cart"
        />
      )}
      {active === 3 && <ContentDividas color="danger" materialIcon="file_copy" />}
    </BlankPage>
  );
};

Orcamento.propTypes = {
  patrimonios: PropTypes.shape().isRequired,
  categorias: PropTypes.shape({
    categorias: PropTypes.arrayOf(
      PropTypes.shape({
        tipo: PropTypes.string,
      }),
    ),
    err: PropTypes.bool,
    gastosOrcados: PropTypes.number,
    gastosRealizados: PropTypes.number,
    loading: PropTypes.bool,
    periodo: PropTypes.number,
    recebimentosOrcados: PropTypes.number,
    recebimentosRealizados: PropTypes.number,
    success: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  categorias: state.categorias,
  patrimonios: state.patrimonios,
});
export default connect(mapStateToProps)(Orcamento);
