/* eslint-disable import/prefer-default-export */
import { LOG_PREFIX } from '../HorizonAPIClient';
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

  async Request(route: APIRoute, data: any = null, debug = false) {
    const routeCopy = route;

    // checks
    if (route.requiresID) {
      if (!route.ID) {
        console.error(`${LOG_PREFIX}Canceled request because ID was missing`);
        return null;
      }

      // inject ID into the route
      routeCopy.route = route.route.replace(ROUTE_ID_REPLACE_PLACEHOLDER, route.ID.toString());
    }

    if (route.requiresParentRoute) {
      if (route.parentRoute === undefined) {
        console.error(`${LOG_PREFIX}Canceled request because parent route was missing`);
        return null;
      }

      routeCopy.route = route.parentRoute.route + route.route;
    }

    // @ts-ignore
    if (!window && !window.fetch) {
      // eslint-disable-next-line import/no-extraneous-dependencies, global-require
      globalThis.fetch = require('node-fetch');
    }

    const headers = this.defaultHeaders;

    if (this.Config.BearerToken !== '') {
      headers.set('Authorization', `Bearer ${this.Config.BearerToken}`);
    }

    const options: RequestInit = {
      method: RequestMethod[route.method],
      headers,
    };

    if (data !== null) {
      options.body = JSON.stringify(data);
    }

    if (debug) {
      console.log(`Sending request to: ${this.Config.ServerUrl}${routeCopy.route}`);
      console.log(`Options: ${JSON.stringify(options)}`);
    }

    let response: Response;
    try {
      response = await fetch(this.Config.ServerUrl + routeCopy.route, options);
      return response;
    } catch (ex) {
      console.error(`Error (url: ${this.Config.ServerUrl}${routeCopy.route}) ${ex}`);
      return null;
    }
  }
}
