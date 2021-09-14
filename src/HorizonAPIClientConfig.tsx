import { PRODUCTION_SERVER_URL } from './constants/endpoints';
import { Environment } from './enums/Environment';

export class HorizonAPIClientConfig {
  /**
   * The current Bearer token used for authentication.
   */
  BearerToken = '';

  readonly OAuthClientId: number = 0;

  readonly OAuthClientSecret: string = '';

  /**
   * The current environment for the API client. Can only be set in the constructor.
   */
  readonly Environment: Environment;

  /**
   * The current server used by the API client. Will only be set when initalizing the config.
   */
  readonly ServerUrl: String;

  Debug: boolean = false;

  constructor(
    oAuthClientId: number,
    oAuthClientSecret: string,
    env: Environment = Environment.Production,
    customLocalServerUrl: String = '',
  ) {
    this.Environment = env;

    this.OAuthClientId = oAuthClientId;
    this.OAuthClientSecret = oAuthClientSecret;

    // Set ServerUrl
    switch (env) {
      case Environment.LocalDevelopment:
        if (customLocalServerUrl) {
          this.ServerUrl = customLocalServerUrl;
        } else {
          this.ServerUrl = 'http://localhost:8000/';
        }
        break;

      default:
        this.ServerUrl = PRODUCTION_SERVER_URL;
        break;
    }
  }
}
