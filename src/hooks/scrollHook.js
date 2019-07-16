import { createRef } from 'react';

export default function scrollHook(element) {
  if (!element) return;
  const ref = createRef();
  ref.current = element;
  ref.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
