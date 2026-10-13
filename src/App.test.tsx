import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from './App';

describe('App portfolio root component', () => {
  it('renders personal identity, degree, and direct action buttons', async () => {
    render(<App />);

    // Name & Degree
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Miloš Petrović/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(/Software Engineer \(Master's Degree\)/i).length
    ).toBeGreaterThan(0);

    // Direct Action Links
    expect(screen.getByRole('button', { name: /Download CV/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /GitHub/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /LinkedIn/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/EduScheduler Interactive Grid/i)).toBeInTheDocument();
    });
  });

  it('renders interactive showcase sections and contact info', async () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /EduScheduler: Resource Reservation Engine/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Smart TV LightningJS Emulator/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Direct Contact & Opportunities/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(/milos\.petrovic\.programer@gmail\.com/i).length
    ).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText(/Turing Hall A/i)).toBeInTheDocument();
    });
  });
});
