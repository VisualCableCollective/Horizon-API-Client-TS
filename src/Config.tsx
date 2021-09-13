import { PRODUCTION_SERVER_URL } from './constants/endpoints';
import { Environment } from './enums/Environment';

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

  constructor(
    env: Environment = Environment.Production,
    customLocalServerUrl: String = '',
  ) {
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
