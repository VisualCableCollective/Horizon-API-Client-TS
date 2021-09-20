export default interface APIRoute {
    route: string;
    method: RequestMethod;
    requiresAuth: boolean;
    requiresID: boolean;
    requiresParentRoute: boolean;
    parentRoute?: APIRoute;
    ID?: string | number;
    disableApiUrlPrefix: boolean;
}
export declare enum RequestMethod {
    GET = 0,
    POST = 1
}
