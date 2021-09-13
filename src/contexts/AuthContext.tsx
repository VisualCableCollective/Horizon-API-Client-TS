import {
  createContext, useContext, useState,
} from 'react';
import * as React from 'react';
import { HorizonAPIClient, LoginStatus } from '..';
import { HTTPStatusCode } from '../enums/HTTPStatusCode';
import { AuthUser } from '../models/AuthUser';
import { TokenResponse } from '../models/responses/oauth/TokenResponse';

export type AuthContextType = {
  user: AuthUser;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<LoginStatus>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: new AuthUser(),
  isAuthenticated: false,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_emailOrUsername: string, _password: string) => {
    console.error('No auth provider');
    return LoginStatus.Unknown;
  },
  logout: () => {
    console.error('No auth provider');
  },
});

interface Props {
  children: React.ReactNode;
  apiClient: HorizonAPIClient;
  storeAuthData: (data: string) => void;
  getAuthData: () => string;
}

export function AuthContextProvider(props: Props) {
  const { children } = props;

  const [user, setUser] = useState(new AuthUser());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function loginHandler(emailOrUsername: string, password: string) {
    const response = await props.apiClient.authenticateUserWithCredentials(emailOrUsername,
      password);

    if (response == null) {
      return LoginStatus.UnknownError;
    }

    if (response.status !== HTTPStatusCode.OK) {
      return LoginStatus.UnknownError;
    }

    const tokenData = new TokenResponse(await response?.json());

    props.storeAuthData(JSON.stringify(tokenData));

    const authUser = new AuthUser();
    authUser.TokenData = tokenData;
    setUser(authUser);
    setIsAuthenticated(true);

    return LoginStatus.Success;
  }

  const context = {
    user,
    isAuthenticated,
    login: loginHandler,
    logout: () => {
      console.error('Logout is not implemented yet!');
    },
  };

  React.useEffect(() => {
    // check if user was already signed in in the browser
    const authData = props.getAuthData();
    if (authData) {
      // restore session
      const authUser = new AuthUser();

      authUser.TokenData = new TokenResponse(authData);

      setUser(authUser);
      setIsAuthenticated(true);
      console.log('restored session!');
    }
  }, []);

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
