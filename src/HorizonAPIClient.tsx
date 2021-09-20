// Constants
import { HorizonAPIClientConfig } from '.';
import { GET_SELF_USER_DATA_ROUTE, GET_TEAM_ROUTE, USER_CREDENTIALS_LOGIN_ROUTE } from './constants/routes';
import { HTTPStatusCode } from './enums/HTTPStatusCode';
import { LoginStatus } from './enums/LoginStatus';
import { TokenResponse } from './models/responses/TokenResponse';
import { SelfUser } from './models/SelfUser';

// Models
import { Team } from './models/Team';
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
      return { status: LoginStatus.UnknownError };
    }

    if (response.status === HTTPStatusCode.BadRequest) {
      return { status: LoginStatus.CredentialsInvalid };
    }

    const tokenData = new TokenResponse(await response.json());

    return { status: LoginStatus.Success, tokenData };
  }

  async getAuthenticatedUser(withTeams = false) {
    let withRelationships = '';
    if (withTeams) {
      withRelationships += 'teams,';
    }

    const response = await this.RequestService.Request(GET_SELF_USER_DATA_ROUTE, {
      with: withRelationships,
    });

    if (response === null || response.status !== HTTPStatusCode.OK) {
      return { success: false };
    }

    return { success: true, data: new SelfUser(await response.json()) };
  }

  /**
   * Tries to find a team for the given ID.
   * @param id the ID of the team
   * @returns a Team model
   */
  async getTeam(id: number, withProducts = false) {
    const getTeamRouteCopy = GET_TEAM_ROUTE;
    getTeamRouteCopy.ID = id;

    let withRelationships = '';
    if (withProducts) {
      withRelationships += 'products,';
    }

    const response = await this.RequestService.Request(getTeamRouteCopy, {
      with: withRelationships,
    });

    if (response === null || response.status !== HTTPStatusCode.OK) {
      return { success: false };
    }

    return { success: true, data: new Team(await response.json()) };
  }
}
