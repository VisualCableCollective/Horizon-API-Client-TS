import APIRoute from '../models/APIRoute';
import { HorizonAPIClientConfig } from '..';
export declare class HTTPRequestUtil {
    Config: HorizonAPIClientConfig;
    constructor(config: HorizonAPIClientConfig);
    private defaultHeaders;
    Request(route: APIRoute, data?: any): Promise<Response | null>;
}
