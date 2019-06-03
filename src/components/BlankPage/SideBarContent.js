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
        ]}
      />
      <CollapsedItem title="Almejar" icon="mood" idColapse="almejar" itens={[]} setPage={setPage} />
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
        ]}
        setPage={setPage}
      />
      <CollapsedItem
        title="Atuar"
        icon="text_rotation_none"
        idColapse="atuar"
        itens={[]}
        setPage={setPage}
      />
      <CollapsedItem
        title="Gestão"
        icon="library_books"
        idColapse="gestao"
        itens={[]}
        setPage={setPage}
      />
    </ul>
  );
}

SideBarContent.propTypes = {
  setPage: PropTypes.func.isRequired,
};
