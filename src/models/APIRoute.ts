export default interface APIRoute {
  route: string,
  method: RequestMethod,
  requiresAuth: boolean,
  requiresID: boolean,
  requiresParentRoute: boolean,
  parentRoute?: APIRoute,
  ID?: string | number,
}

export enum RequestMethod {
  GET,
  POST,
}
