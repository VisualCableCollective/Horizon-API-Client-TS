import { HorizonAPIClientConfig } from '.';
import { LoginStatus } from './enums/LoginStatus';
import { TokenResponse } from './models/responses/TokenResponse';
import { SelfUser } from './models/SelfUser';
import { Team } from './models/Team';
import { HTTPRequestUtil } from './utils/HTTPRequestUtil';
export declare const LOG_PREFIX = "[Horizon API] ";
export declare class HorizonAPIClient {
    /**
     * The config used by the API client.
     */
    Config: HorizonAPIClientConfig;
    RequestService: HTTPRequestUtil;
    constructor(config: HorizonAPIClientConfig);
    /**
     * Authenticates a user with the given token.
     * @param token Bearer token to authenticate a user
     * @returns true if the user has been authenticated successfully
     */
    authenticateUserWithToken(token: string): Promise<boolean>;
    /**
     * Authenticates a user with the given token.
     * @param token Bearer token to authenticate a user
     * @returns true if the user has been authenticated successfully
     */
    authenticateUserWithCredentials(username: string, password: string): Promise<{
        status: LoginStatus;
        tokenData?: undefined;
    } | {
        status: LoginStatus;
        tokenData: TokenResponse;
    }>;
    getAuthenticatedUser(withTeams?: boolean): Promise<{
        success: boolean;
        data?: undefined;
    } | {
        success: boolean;
        data: SelfUser;
    }>;
    /**
     * Tries to find a team for the given ID.
     * @param id the ID of the team
     * @returns a Team model
     */
    getTeam(id: number, withProducts?: boolean): Promise<{
        success: boolean;
        data?: undefined;
    } | {
        success: boolean;
        data: Team;
    }>;
}
