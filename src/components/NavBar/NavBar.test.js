import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import NavBar from './NavBar';

// Mocking the redux store
const mockStore = configureMockStore();

describe('NavBar Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        premiumEligible: true,
        premium: false,
      },
    });
  });

  test('renders welcome message', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
    expect(getByText('Welcome to Expense Tracker!!!')).toBeInTheDocument();
  });

  test('renders "Buy Premium" button when user is eligible', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
    expect(getByText('Buy Premium')).toBeInTheDocument();
  });

  test('not render "Buy Premium" button when user is not eligible', ()=>{
        store = mockStore({
            auth: {
                premiumEligible: false,
                premium: false,
            }
        });

        const { queryByText } = render(
            <Provider store={store}>
              <Router>
                <NavBar />
              </Router>
            </Provider>
        );
        expect(queryByText("Buy Premium")).toBeNull();
    });

    test('renders signout button', ()=> {
        store = mockStore({
            auth: {
                premiumEligible: false,
                premium: false,
            }
        });

        const { getByText } = render(
            <Provider store={store}>
              <Router>
                <NavBar />
              </Router>
            </Provider>
        );

        expect(getByText('Sign Out')).toBeInTheDocument();
    });

    test('renders profile button/icon', ()=> {
        store = mockStore({
            auth: {
                premiumEligible: false,
                premium: false,
            }
        });

        const { container } = render(
            <Provider store={store}>
              <Router>
                <NavBar>
                </NavBar>
              </Router>
            </Provider>
        );
        const profileIcon = container.querySelector('.ri-user-fill');
        console.log(profileIcon);
        expect(profileIcon).toBeInTheDocument();
    });

    test('renders "Switch" when user is premium', () => {
    store = mockStore({
      auth: {
        premiumEligible: true,
        premium: true,
      },
      theme: {
        isDarkMode: false,
      }
    });
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
    expect(getByText('Light').closest('.react-switch')).toBeInTheDocument();
  });

 
});
