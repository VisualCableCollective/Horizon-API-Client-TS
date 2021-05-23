// Constants
// eslint-disable-next-line max-classes-per-file
import { GET_SELF_USER_DATA_ROUTE, GET_TEAM_ROUTE } from './constants/routes';
import { PRODUCTION_SERVER_URL } from './constants/endpoints';

// Constants
import { ROUTE_ID_REPLACE_PLACEHOLDER, GET_PRODUCTS_OF_TEAM_ROUTE } from './constants/routes';

// Models
import APIRoute from './models/APIRoute';
import Product from './models/Product';

namespace HorizonAPI {
  export class HTTPRequestUtil {
    static async Request(route: APIRoute, data: any = null) {
      const routeCopy = route;

      // checks
      if (route.requiresID) {
        if (!route.ID) {
          console.error('Horizon API: canceled request because ID was missing');
          return null;
        }
        // inject ID into the route
        routeCopy.route = route.route.replace(ROUTE_ID_REPLACE_PLACEHOLDER, route.ID.toString());
      }

      if (route.requiresParentRoute) {
        if (route.parentRoute === undefined) {
          console.error('Horizon API: canceled request because parent route was missing');
          return null;
        }
        routeCopy.route = route.parentRoute.route + route.route;
      }

      let actualFetch;
      // @ts-ignore
      if (window.fetch) {
        actualFetch = fetch;
      } else {
        // eslint-disable-next-line global-require
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
      return new HorizonAPI.Team(await response.json());
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

  export class Team {
    id: number;
    name: string;

    createdAt: Date;
    updatedAt: Date;

    constructor(apiTeamResponse: any) {
      this.id = apiTeamResponse.id;
      this.name = apiTeamResponse.name;

      this.createdAt = new Date(apiTeamResponse.created_at);
      this.updatedAt = new Date(apiTeamResponse.updated_at);
    }

    async getProducts() {
      const parentRoute = GET_TEAM_ROUTE;
      parentRoute.ID = this.id;

      const routeCopy = GET_PRODUCTS_OF_TEAM_ROUTE;
      routeCopy.parentRoute = parentRoute;

      const response = await HTTPRequestUtil.Request(routeCopy);
      if (response === null) {
        return null;
      }
      if (!response.ok) {
        return null;
      }
      const productsJSON = await response.json();
      const productsArray: Product[] = [];
      await productsJSON.forEach((element: any) => {
        productsArray.push(new Product(element));
      });

      return productsArray;
    }
  }
}

export = HorizonAPI;
