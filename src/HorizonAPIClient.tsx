// Constants
import { HorizonAPIClientConfig } from '.';
import { GET_SELF_USER_DATA_ROUTE, GET_TEAM_ROUTE, USER_CREDENTIALS_LOGIN_ROUTE } from './constants/routes';

// Models
import Team from './models/Team';
import { HTTPRequestUtil } from './utils/HTTPRequestUtil';

export const LOG_PREFIX = '[Horizon API] ';

export class HorizonAPIClient {
  /**
   * The config used by the API client.
   */
  Config: HorizonAPIClientConfig;

  RequestService: HTTPRequestUtil;

  constructor(config: HorizonAPIClientConfig) {
    this.Config = config;
    this.RequestService = new HTTPRequestUtil(config);
  }

  /**
   * Authenticates a user with the given token.
   * @param token Bearer token to authenticate a user
   * @returns true if the user has been authenticated successfully
   */
  async authenticateUserWithToken(token: string) {
    this.Config.BearerToken = token;

    const response = await this.RequestService.Request(GET_SELF_USER_DATA_ROUTE);
    if (response === null) {
      return false;
    }

    if (!response.ok) {
      return false;
    }

    return true;
  }

  /**
   * Authenticates a user with the given token.
   * @param token Bearer token to authenticate a user
   * @returns true if the user has been authenticated successfully
   */
  async authenticateUserWithCredentials(username: string, password: string) {
    const response = await this.RequestService.Request(USER_CREDENTIALS_LOGIN_ROUTE, {
      grant_type: 'password',
      client_id: this.Config.OAuthClientId,
      client_secret: this.Config.OAuthClientSecret,
      username,
      password,
      scope: '*',
    });

    if (response === null) {
      return false;
    }

    if (!response.ok) {
      return false;
    }

    return true;
  }

  /**
   * Tries to find a team for the given ID.
   * @param id the ID of the team
   * @returns a Team model
   */
  async getTeam(id: number | string) {
    const getTeamRouteCopy = GET_TEAM_ROUTE;
    getTeamRouteCopy.ID = id;

    const response = await this.RequestService.Request(getTeamRouteCopy);

    if (response === null) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    return new Team(await response.json());
  }
}
