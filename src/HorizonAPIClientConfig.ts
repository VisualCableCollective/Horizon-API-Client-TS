// Constants
import { PRODUCTION_SERVER_URL } from './constants/endpoints';

export default class HorizonAPIClientConfig {
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
          this.ServerUrl = 'https://localhost:8000/';
        }
        break;
      default:
        this.ServerUrl = PRODUCTION_SERVER_URL;
        break;
    }
  }
}

enum Environment {
  /**
   * The API client is used in a production environment and will connect to the production services.
   */
  Production,

  /**
   * The API client is used in a local development environment and will only connect to the local server specified in the constructor or to the default 'https://localhost:8000/' server.
   */
  LocalDevelopment,
}
