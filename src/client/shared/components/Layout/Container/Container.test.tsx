import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from './Container';

describe('<Container />', () => {
  it('renders children', () => {
    const text = 'Container';
    render(<Container>{text}</Container>);

    const containerElement = screen.getByText(text);

    expect(containerElement).toBeInTheDocument();
  });
});
