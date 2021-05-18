import { HorizonAPIClientConfig } from '../HorizonAPIClient';

// Models
import APIRoute from '../models/APIRoute';

export default class HTTPRequestUtil {
  static async Request(route: APIRoute, clientConfig: HorizonAPIClientConfig,
    data: any = null) {
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
    if (clientConfig.BearerToken !== '') {
      headers.Authorization = `Bearer ${clientConfig.BearerToken}`;
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
      response = await actualFetch(clientConfig.ServerUrl + route.route, options);
      return response;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  }
}
