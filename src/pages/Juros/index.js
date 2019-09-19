import React, { useState } from 'react';
import Dividas from './Dividas';
import Resultado from './Resultado';
import Upper from './Upper';
import Text from './Text';

import { Container } from './style';
import './style.css';

export default function Juros() {
  const [dividas, setDividas] = useState(
    JSON.parse(localStorage.getItem('@Calculadora: dividas')) || []
  );

  return (
    <Container>
      <Upper />
      <div className="resolution">
        <Text />
        <Dividas dividas={dividas} setDividas={setDividas} />
      </div>
      <Resultado dividas={dividas} />
    </Container>
  );
}
