// Models
import APIRoute, { RequestMethod } from '../models/APIRoute';

export const GET_SELF_USER_DATA_ROUTE: APIRoute = { route: 'user/me', method: RequestMethod.GET, requiresAuth: true };
export const GET_TEAM: APIRoute = { route: 'store/teams/', method: RequestMethod.GET, requiresAuth: false };
