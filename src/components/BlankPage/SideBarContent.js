import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import ItemLancamento from './ItemLancamento';
import CollapsedItem from './CollapsedItem';

export default function SideBarContent({ setPage }) {
  return (
    <ul className="nav">
      <ItemLancamento />
      <Item href="/painel" title="Painel de Controle" icon="assessment" setPage={setPage} />
      <Item icon="local_printshop" title="Extrato" href="/extrato" setPage={setPage} />
      <CollapsedItem
        setPage={setPage}
        title="Mapear"
        icon="map"
        idColapse="mapear"
        itens={[
          {
            href: '/orcamento',
            mini: 'OR',
            title: 'Orçamento',
          },
          {
            href: '/patrimonio',
            mini: 'PR',
            title: 'Patrimônio',
          },
          {
            href: '/crencas',
            mini: 'CR',
            title: 'Crenças',
          },
        ]}
      />
      <CollapsedItem
        title="Almejar"
        icon="mood"
        idColapse="almejar"
        itens={[
          {
            href: '/V1Ano',
            mini: 'V1A',
            title: 'V1Ano',
          },
          {
            href: '/V5ANos',
            mini: 'V5A',
            title: 'V5Anos',
          },
          {
            href: '/Ressignificacao',
            mini: 'RC',
            title: 'Ressignificação',
          },
        ]}
        setPage={setPage}
      />
      <CollapsedItem
        title="Planejar"
        icon="trending_up"
        idColapse="planejar"
        itens={[
          {
            href: '/pq5+1',
            mini: 'PQ',
            title: 'PQ5+1',
          },
          {
            href: '/acoes30d',
            mini: 'A30',
            title: 'Ações 30D',
          },
        ]}
        setPage={setPage}
      />
      <CollapsedItem
        title="Atuar"
        icon="text_rotation_none"
        idColapse="atuar"
        itens={[
          {
            href: '/acoes_atuar30d',
            mini: 'A30',
            title: 'Ações 30D',
          },
          {
            href: '/acoes_atuar7d',
            mini: 'A7',
            title: 'Ações 7D',
          },
          {
            href: '/acoes_atuar1d',
            mini: 'A1',
            title: 'Ações 1D',
          },
        ]}
        setPage={setPage}
      />
    </ul>
  );
}

SideBarContent.propTypes = {
  setPage: PropTypes.func.isRequired,
};
