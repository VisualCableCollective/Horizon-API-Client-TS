import Config from './HorizonAPIClientConfig';

// Utils
import HTTPRequestUtil from './utils/HTTPRequestUtil';

// Constants
import { GET_SELF_USER_DATA_ROUTE } from './constants/routes';

export default class HorizonAPIClient {
  /**
   * The config used by the API client.
   */
  readonly Config: Config;

  constructor(config = new Config()) {
    this.Config = config;
  }

  /**
   * Authenticates a user with the given token.
   * @param token Bearer token to authenticate a user
   * @returns true if the user has been authenticated successfully
   */
  async authenticateUserWithToken(token: string) {
    this.Config.BearerToken = token;
    const response = await HTTPRequestUtil.Request(GET_SELF_USER_DATA_ROUTE, this.Config);
    if (response === null) {
      return false;
    }
    if (!response.ok) {
      return false;
    }
    return true;
  }
}
