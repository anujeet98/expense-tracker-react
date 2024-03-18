import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock services
jest.mock('./services/userProfileService', () => ({
  getUserProfile: jest.fn().mockResolvedValue({ /* mock user profile data */ }),
}));

// Mock useSelector
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue(false); // Default to not logged in
  });

  test('renders loading spinner initially', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('redirects to login page if not logged in', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Redirecting to sign-in page..')).toBeInTheDocument();
    });
    expect(window.location.pathname).toBe('/auth');
  });

  test('renders home page if logged in', async () => {
    useSelector.mockReturnValue(true); // Mock logged in state

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
    expect(window.location.pathname).toBe('/');
  });

  test('redirects to login page if reauthentication fails', async () => {
    // Mock getUserProfile to throw an error
    require('./services/userProfileService').getUserProfile.mockRejectedValueOnce(new Error('Authentication failed'));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Redirecting to login page...')).toBeInTheDocument();
    });
    expect(window.location.pathname).toBe('/auth');
  });

  // Add more tests for other routes and edge cases as needed
});
