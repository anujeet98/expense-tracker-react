
import { render, screen, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import configureMockStore from 'redux-mock-store';
import { Provider } from "react-redux";
// import { Router } from "react-router-dom/cjs/react-router-dom.min";
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

const mockStore = configureMockStore();

describe('NavBar Component', () => {
  let store;

    beforeEach(() => {
        store = mockStore({
            auth: {
                userData: {
                    "kind": "identitytoolkit#VerifyPasswordResponse",
                    "localId": "zRfYPXbShSH9Cw2",
                    "email": "anujeet98@gmail.com",
                    "displayName": "Anujeet Swain",
                    "idToken": "uKQgWE9zRm6o-g5CsmA",
                    "registered": true,
                    "profilePicture": "https://avatars.githubusercontent.com/u/31065438?v=4",
                    "refreshToken": "Uak",
                    "expiresIn": "3600"
                },
                token: '2342342342413sef',
            },
            theme: {
                isDarkMode: false,
            }
        });
    });

    test('render profile page', () => {
          const { getByText } = render(
            <Provider store={store}>
                <Router>
                    <Profile />
                </Router>
            </Provider>
          );

        expect(getByText('Contact Details')).toBeInTheDocument();
    });

    test('render profile page', () => {
        const initialState = {
            auth: {
              userData: {
                email: 'test@example.com',
                emailVerified: false
              }
            },
            theme: {
                isDarkMode: false,
            }
          };
        
          const store = mockStore(initialState);
        
          const { getByText } = render(
            <Provider store={store}>
                <Router>
                    <Profile />
                </Router>
            </Provider>
          );
        expect(getByText(`Email: ${initialState.auth.userData.email}`)).toBeInTheDocument();
    });

    test('render verify button', () => {
        const initialState = {
            auth: {
              userData: {
                email: 'test@example.com',
                emailVerified: false
              }
            },
            theme: {
                isDarkMode: false,
            }
          };
        
          const store = mockStore(initialState);
        
          const { getByRole } = render(
            <Provider store={store}>
                <Router>
                    <Profile />
                </Router>
            </Provider>
          );
        if (!initialState.auth.userData.emailVerified) {
          expect(getByRole('button', { name: 'Verify' })).toBeInTheDocument();
        }
    });

    test('test input-name field update', () => {
        const initialState = {
            auth: {
              userData: {
                email: 'test@example.com',
                emailVerified: false,
                displayName: 'test',
              }
            },
            theme: {
                isDarkMode: false,
            }
          };
        
          const store = mockStore(initialState);
        
          const { container } = render(
            <Provider store={store}>
                <Router>
                    <Profile />
                </Router>
            </Provider>
          );

          const fullName = container.querySelector('#name');
          const before = fullName.value;
          const typeValue = 'new';
          userEvent.type(fullName, typeValue);
          expect(fullName).toHaveValue(`${before}${typeValue}`);

    });

    test('test cancel button', async() => {
        const initialState = {
            auth: {
              userData: {
                email: 'test@example.com',
                emailVerified: false,
                displayName: 'test',
              }
            },
            theme: {
                isDarkMode: false,
            }
          };
        
          const store = mockStore(initialState);
        
          const { container, getByRole } = render(
            <Provider store={store}>
                <Router>
                    <Profile />
                </Router>
            </Provider>
          );

          const fullName = container.querySelector('#name');
          const cancelBtn = getByRole('button', { name: 'Cancel' });
          const before = fullName.value;
          const typeValue = 'new';
          userEvent.type(fullName, typeValue);
        //   cancelBtn.click();
          userEvent.click(cancelBtn);
          await waitFor(() => {
            expect(fullName.value).toBe(before);
          });
        
    });

});