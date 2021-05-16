// Constants
import { PRODUCTION_SERVER_URL } from './constants/endpoints';

export default class HorizonAPIClientConfig {
  // Authentication
  BearerToken = '';

  readonly Environment: Environment;
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
  Production,
  LocalDevelopment,
}
