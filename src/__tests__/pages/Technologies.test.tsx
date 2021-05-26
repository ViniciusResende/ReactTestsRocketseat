import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Technologies from '../../pages/Technologies';

// Testando a pagina de tecnologias
describe('Testing Technologies Page', () => {
  // Deve ser possivel adicionar novas tecnologis
  it('should be able to add ne technology', () => {
    render(<Technologies />);

    const input = screen.getByTestId('input-add-tech');
    const form = screen.getByTestId('form-add-tech');

    userEvent.type(input, 'React Native');
    fireEvent.submit(form);

    // toBeTruthy significa que o elemento existe na arvore
    expect(screen.getByTestId('React Native')).toBeTruthy();

    // A mesma coisa que o expect acima porem com ma legibilidade e semantica.
    // expect(!!screen.getByTestId("React Native")).toBe(true);
  });

  // deve ser possivel listar tres
  it('should be able to list three techs', () => {
    // a primeira tecnologia e adicionada por padrao

    const { getByTestId } = render(<Technologies />);

    const input = getByTestId('input-add-tech');
    const form = getByTestId('form-add-tech');
    // screen.logTestingPlaygroundURL();
    fireEvent.change(input, { target: { value: 'React Native' } });
    fireEvent.submit(form);
    fireEvent.change(input, { target: { value: 'Flutter' } });
    fireEvent.submit(form);

    const techList = getByTestId('ul-techs');
    expect(techList.children.length).toBe(3);
  });

  // Deve ser possivel deletar uma tecnologia
  it('should be able to delete one tech', () => {
    render(<Technologies />);

    const input = screen.getByTestId('input-add-tech');
    const form = screen.getByTestId('form-add-tech');

    userEvent.type(input, 'React Native');
    fireEvent.submit(form);

    // toBeTruthy significa que o elemento existe na arvore
    expect(screen.getByTestId('React Native')).toBeTruthy();

    const itemButton = screen.getByTestId('React Native-btn-delete');
    userEvent.click(itemButton);

    expect(screen.queryByTestId('React Native')).toBeNull();
  });

  // Botao delete deve estar desabilidade apenas para a tecnologia React
  it('button delete should be disabled only for React technology', () => {
    render(<Technologies />);

    const button = screen.getByTestId('React-btn-delete');
    expect(button).toBeDisabled();
  });
});
