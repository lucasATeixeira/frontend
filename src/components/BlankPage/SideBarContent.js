import React from 'react';
import Item from './Item';
import ItemLancamento from './ItemLancamento';
import CollapsedItem from './CollapsedItem';

export default function SideBarContent() {
  return (
    <ul className="nav">
      <ItemLancamento />
      <Item href="/painel" title="Painel de Controle" icon="assessment" />
      <CollapsedItem
        icon="money"
        title="Título"
        idColapse="idColapse"
        itens={[
          {
            href: '/asdf',
            mini: 'T',
            title: 'Teste',
          },
          {
            href: '/ds',
            mini: 'T',
            title: 'Teste',
          },
          {
            href: '/te',
            mini: 'T',
            title: 'Teste',
          },
        ]}
      />
    </ul>
  );
}
