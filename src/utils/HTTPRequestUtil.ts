import { ROUTE_ID_REPLACE_PLACEHOLDER } from '../constants/routes';
import APIRoute, { RequestMethod } from '../models/APIRoute';
import { HorizonAPIClientConfig } from '..';

export class HTTPRequestUtil {
  Config: HorizonAPIClientConfig;

  constructor(config: HorizonAPIClientConfig) {
    this.Config = config;
  }

  private defaultHeaders = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Connection: 'keep-alive',
  });

  async Request(route: APIRoute, data: any = null) {
    const routeCopy = route;

    // checks
    if (route.requiresID) {
      if (!route.ID) {
        console.error(`${this.Config.LogPrefix}Canceled request because ID was missing`);
        return null;
      }

      // inject ID into the route
      routeCopy.route = route.route.replace(ROUTE_ID_REPLACE_PLACEHOLDER, route.ID.toString());
    }

    if (route.requiresParentRoute) {
      if (route.parentRoute === undefined) {
        console.error(`${this.Config.LogPrefix}Canceled request because parent route was missing`);
        return null;
      }

      routeCopy.route = route.parentRoute.route + route.route;
    }

    const headers = this.defaultHeaders;

    if (this.Config.BearerToken !== '') {
      headers.set('Authorization', `Bearer ${this.Config.BearerToken}`);
    }

    const options: RequestInit = {
      method: RequestMethod[route.method],
      headers,
    };

    let params = '';

    if (data !== null) {
      if (route.method === RequestMethod.GET) {
        params = '?';
        Object.keys(data).forEach((key) => {
          params += `${key}=${decodeURI(data[key])}`;
        });
      } else {
        options.body = JSON.stringify(data);
      }
    }

    let serverUrl = this.Config.ServerUrl;

    if (route.disableApiUrlPrefix) {
      serverUrl = serverUrl.replace('api/', '');
    }

    if (this.Config.Debug) {
      console.log(`[RequestUtil] Sending request to ${serverUrl + routeCopy.route + params}`);
      console.log(`[RequestUtil] Data: ${JSON.stringify(options)}}`);
    }

    let response: Response;
    try {
      response = await fetch(serverUrl + routeCopy.route + params, options);
      return response;
    } catch (ex) {
      console.error(`Error (url: ${serverUrl + routeCopy.route + params}) ${ex}`);
      return null;
    }
  }
}
