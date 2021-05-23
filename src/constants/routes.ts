// Models
import APIRoute, { RequestMethod } from '../models/APIRoute';

export const ROUTE_ID_REPLACE_PLACEHOLDER: string = '{id}';

export const GET_SELF_USER_DATA_ROUTE: APIRoute = {
  route: 'user/me', method: RequestMethod.GET, requiresAuth: true, requiresID: false,
};
export const GET_TEAM: APIRoute = {
  route: 'store/teams/{id}', method: RequestMethod.GET, requiresAuth: false, requiresID: true,
};
