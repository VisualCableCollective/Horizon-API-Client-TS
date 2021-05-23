// Constants
import { GET_TEAM_ROUTE, GET_PRODUCTS_OF_TEAM_ROUTE } from '../constants/routes';
import HorizonAPI from '../HorizonAPIClient';

// Utils
import HTTPRequestUtil from '../utils/HTTPRequestUtil';

// Models
import Product from './Product';

export default class Team {
  id: number;
  name: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(apiTeamResponse: any) {
    this.id = apiTeamResponse.id;
    this.name = apiTeamResponse.name;

    this.createdAt = new Date(apiTeamResponse.created_at);
    this.updatedAt = new Date(apiTeamResponse.updated_at);
  }

  async getProducts() {
    const parentRoute = GET_TEAM_ROUTE;
    parentRoute.ID = this.id;

    const routeCopy = GET_PRODUCTS_OF_TEAM_ROUTE;
    routeCopy.parentRoute = parentRoute;

    const response = await HTTPRequestUtil.Request(routeCopy);
    if (response === null) {
      return null;
    }
    if (!response.ok) {
      return null;
    }
    const productsJSON = await response.json();
    const productsArray: Product[] = [];
    await productsJSON.forEach((element: any) => {
      productsArray.push(new Product(element));
    });

    return productsArray;
  }
}
