// Constants
import { GET_SELF_USER_DATA_ROUTE, GET_TEAM_ROUTE } from './constants/routes';
import { PRODUCTION_SERVER_URL } from './constants/endpoints';

// Constants
import { ROUTE_ID_REPLACE_PLACEHOLDER } from './constants/routes';

// Models
import APIRoute from './models/APIRoute';
import { Environment } from './enums/Environment';
import { Team } from './models/Team';

export const LOG_PREFIX = "[Horizon API] ";

export class HTTPRequestUtil {
  static async Request(route: APIRoute, data: any = null) {
    const routeCopy = route;

    // checks
    if (route.requiresID) {
      if (!route.ID) {
        console.error(LOG_PREFIX + 'Canceled request because ID was missing');
        return null;
      }
      
      // inject ID into the route
      routeCopy.route = route.route.replace(ROUTE_ID_REPLACE_PLACEHOLDER, route.ID.toString());
    }

    if (route.requiresParentRoute) {
      if (route.parentRoute === undefined) {
        console.error(LOG_PREFIX + 'Canceled request because parent route was missing');
        return null;
      }

      routeCopy.route = route.parentRoute.route + route.route;
    }

    let actualFetch;
    // @ts-ignore
    if (window.fetch) {
      actualFetch = fetch;
    } else {
      actualFetch = require('node-fetch'); // Node Fetch
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Connection: 'keep-alive',
    };
    if (HorizonAPIClient.Config.BearerToken !== '') {
      headers.Authorization = `Bearer ${HorizonAPIClient.Config.BearerToken}`;
    }

    const options: RequestInit = {
      method: 'GET',
      headers,
    };

    if (data !== null) {
      options.body = JSON.stringify(data);
    }

    let response: Response;
    try {
      response = await actualFetch(HorizonAPIClient.Config.ServerUrl + routeCopy.route, options);
      return response;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  }
}

export class HorizonAPIClientConfig {
  // Authentication
  /**
   * The current Bearer token used for authentication.
   */
  BearerToken = '';

  /**
   * The current environment for the API client. Can only be set in the constructor.
   */
  readonly Environment: Environment;

  /**
   * The current server used by the API client. Will only be set when initalizing the config.
   */
  readonly ServerUrl: String;

  constructor(env: Environment = Environment.Production, customLocalServerUrl: String = '') {
    this.Environment = env;
    // Set ServerUrl
    switch (env) {
      case Environment.LocalDevelopment:
        if (customLocalServerUrl) {
          this.ServerUrl = customLocalServerUrl;
        } else {
          this.ServerUrl = 'http://localhost:8000/api/';
        }
        break;
      default:
        this.ServerUrl = PRODUCTION_SERVER_URL;
        break;
    }
  }
}

export class HorizonAPIClient {
  /**
   * The config used by the API client.
   */
  static Config: HorizonAPIClientConfig;

  /**
   * Authenticates a user with the given token.
   * @param token Bearer token to authenticate a user
   * @returns true if the user has been authenticated successfully
   */
  static async authenticateUserWithToken(token: string) {
    HorizonAPIClient.Config.BearerToken = token;

    const response = await HTTPRequestUtil.Request(GET_SELF_USER_DATA_ROUTE);
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
  static async getTeam(id: number | string) {
    const getTeamRouteCopy = GET_TEAM_ROUTE;
    getTeamRouteCopy.ID = id;

    const response = await HTTPRequestUtil.Request(getTeamRouteCopy);

    if (response === null) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    return new Team(await response.json());
  }
}
