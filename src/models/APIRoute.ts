export default interface APIRoute {
  route: string,
  method: RequestMethod,
  requiresAuth: boolean,
}

export enum RequestMethod {
  GET,
  POST,
}
