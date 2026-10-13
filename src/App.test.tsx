import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App root component', () => {
  it('renders portfolio title and primary showcase sections', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Senior Frontend Architect & Systems Engineer/i,
      })
    ).toBeInTheDocument();

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
  });
});
