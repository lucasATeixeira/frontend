/* eslint-disable no-restricted-globals */

export function handleTelefone(e, setTelefone) {
  let { value } = e.target;

  if (value.length > 14) return;

  if (
    value[value.length - 1] === '('
    || value[value.length - 1] === ')'
    || value[value.length - 1] === '-'
  ) return;

  if (value.length === 1) {
    value = `(${value}`;
  }

  if (value.length === 4) {
    value = `${value.slice(0, 3)})${value.slice(3, 4)}`;
  }

  if (value.length === 10) {
    value = `${value.slice(0, 9)}-${value.slice(9, 10)}`;
  }

  setTelefone(value);
}

export function handleCpf(e, setCpf) {
  let { value } = e.target;
  const first = value.split('-');
  const second = value.split('-')[0].split('.');
  if (isNaN([...second, first[1]].join(''))) return;
  if (value[value.length - 1] === '.' || value[value.length - 1] === '-') return;
  if (value.length > 14) return;
  if (value.length === 4 && value[3] !== '.') {
    value = `${value.slice(0, 3)}.${value.slice(3, 4)}`;
  }
  if (value.length === 8 && value[7] !== '.') {
    value = `${value.slice(0, 7)}.${value.slice(7, 8)}`;
  }
  if (value.length === 12 && value[11] !== '-') {
    value = `${value.slice(0, 11)}-${value.slice(11, 12)}`;
  }
  setCpf(value);
}

export function handleDate(e, setDate) {
  let { value } = e.target;
  if (value.length > 10) return;
  if (value[value.length - 1] === '/') return;
  if (isNaN(value.split('/').join(''))) return;
  if (value.length === 3 && value[2] !== '/') {
    value = `${value.slice(0, 2)}/${value.slice(2, 3)}`;
  }
  if (value.length === 6 && value[5] !== '/') {
    value = `${value.slice(0, 5)}/${value.slice(5, 6)}`;
  }
  setDate(value);
}
