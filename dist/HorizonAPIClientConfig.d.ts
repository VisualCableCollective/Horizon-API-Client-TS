import { Environment } from './enums/Environment';
export declare class HorizonAPIClientConfig {
    /**
     * The current Bearer token used for authentication.
     */
    BearerToken: string;
    readonly OAuthClientId: number;
    readonly OAuthClientSecret: string;
    /**
     * The current environment for the API client. Can only be set in the constructor.
     */
    readonly Environment: Environment;
    /**
     * The current server used by the API client. Will only be set when initalizing the config.
     */
    readonly ServerUrl: String;
    Debug: boolean;
    LogPrefix: string;
    constructor(oAuthClientId: number, oAuthClientSecret: string, env?: Environment, customLocalServerUrl?: String);
}
