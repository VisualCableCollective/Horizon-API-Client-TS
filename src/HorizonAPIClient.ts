// Utils
// eslint-disable-next-line max-classes-per-file
import HTTPRequestUtil from './utils/HTTPRequestUtil';

// Constants
import { GET_SELF_USER_DATA_ROUTE, GET_TEAM_ROUTE } from './constants/routes';
import { PRODUCTION_SERVER_URL } from './constants/endpoints';

// Models
import Team from './models/Team';

namespace HorizonAPI {
  export class HorizonAPIClient {
    /**
     * The config used by the API client.
     */
    readonly Config: HorizonAPIClientConfig;

    constructor(config = new HorizonAPIClientConfig()) {
      this.Config = config;
    }

    /**
     * Authenticates a user with the given token.
     * @param token Bearer token to authenticate a user
     * @returns true if the user has been authenticated successfully
     */
    async authenticateUserWithToken(token: string) {
      this.Config.BearerToken = token;
      const response = await HTTPRequestUtil.Request(GET_SELF_USER_DATA_ROUTE, this.Config);
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
      const response = await HTTPRequestUtil.Request(getTeamRouteCopy, this.Config);
      if (response === null) {
        return null;
      }
      if (!response.ok) {
        return null;
      }
      return new Team(await response.json());
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

  export enum Environment {
    /**
     * The API client is used in a production environment and will connect to the production
     * services.
     */
    Production,

    /**
     * The API client is used in a local development environment and will only connect to the local server specified in the constructor or to the default 'https://localhost:8000/' server.
     */
    LocalDevelopment,
  }
}

export = HorizonAPI;
