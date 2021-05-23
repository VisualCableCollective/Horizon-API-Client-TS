import { HorizonAPIClient } from '../HorizonAPIClient';

// Constants
import { ROUTE_ID_REPLACE_PLACEHOLDER } from '../constants/routes';

// Models
import APIRoute from '../models/APIRoute';

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
}
