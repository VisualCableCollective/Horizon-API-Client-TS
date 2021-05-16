import Config from './HorizonAPIClientConfig';

export default class HorizonAPIClient {
  /**
   * The config used by the API client.
   */
  readonly Config: Config;

  constructor(config = new Config()) {
    this.Config = config;
  }
}
