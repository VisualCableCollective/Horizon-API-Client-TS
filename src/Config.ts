import { Environment } from './enums/Environment';
import { PRODUCTION_SERVER_URL } from './constants/Endpoints';

export class HorizonApiClientConfig {
  /**
   * The current environment for the API client. Can only be set in the constructor.
   */
  readonly Environment: Environment;

  /**
   * The current server used by the API client. Will only be set when initializing the config.
   */
  readonly ServerUrl: string;

  Debug: boolean = false;

  constructor(
    env: Environment = Environment.Production,
    customLocalServerUrl: string = 'http://localhost:8000/api/',
  ) {
    this.Environment = env;

    // Set ServerUrl
    switch (env) {
      case Environment.LocalDevelopment:
        this.ServerUrl = customLocalServerUrl;
        break;

      default:
        this.ServerUrl = PRODUCTION_SERVER_URL;
        break;
    }
  }
}
