export default interface APIRoute {
  route: string,
  method: RequestMethod,
  requiresAuth: boolean,
  requiresID: boolean,
  ID?: string | number,
}

export enum RequestMethod {
  GET,
  POST,
}
