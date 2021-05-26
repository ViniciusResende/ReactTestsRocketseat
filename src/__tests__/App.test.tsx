import { render, screen } from '@testing-library/react';

import React from 'react';
import App from '../App';

describe('Testing App.tsx', () => {
  // Deve ser possivel exibir o elemento h1 na pagina
  it('should be able to show the h1 element', () => {
    render(<App />);
    const h1Element = screen.getByText(/bem vindo ao teste/i);

    expect(h1Element).toBeInTheDocument();
  });
});
