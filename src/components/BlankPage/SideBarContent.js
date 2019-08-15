import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import ItemLancamento from './ItemLancamento';
import CollapsedItem from './CollapsedItem';
import ButtonPainel from './ButtonPainel';

export default function SideBarContent({ setPage }) {
  return (
    <ul className="nav">
      <ButtonPainel />
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
            href: '/comportamento',
            mini: 'CMP',
            title: 'Comportamento',
          },
        ]}
      />
      <CollapsedItem
        title="Almejar"
        icon="mood"
        idColapse="almejar"
        itens={[
          {
            href: '/V5ANos',
            mini: 'V5A',
            title: 'Visão 5 anos',
          },
          {
            href: '/V1Ano',
            mini: 'V1A',
            title: 'Visão 1 ano',
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
            mini: 'RAC',
            title: 'Alinhamento RAC',
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
            title: 'Ações 30 Dias',
          },
          {
            href: '/acoes_atuar7d',
            mini: 'A7',
            title: 'Ações 7 Dias',
          },
          {
            href: '/acoes_atuar1d',
            mini: 'A1',
            title: 'Ações 1 Dias',
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
