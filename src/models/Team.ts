import { Product } from './Product';

export class Team {
  id: number;

  name: string;

  createdAt: Date;

  updatedAt: Date;

  products: Product[] = [];

  constructor(apiTeamResponse: any) {
    this.id = apiTeamResponse.id;
    this.name = apiTeamResponse.name;

    this.createdAt = new Date(apiTeamResponse.created_at);
    this.updatedAt = new Date(apiTeamResponse.updated_at);

    if (apiTeamResponse.products) {
      apiTeamResponse.products.forEach((productData: any) => {
        this.products.push(new Product(productData));
      });
    }
  }

  /* async getProducts() {
    const parentRoute = GET_TEAM_ROUTE;
    parentRoute.ID = this.id;

    const routeCopy = GET_PRODUCTS_OF_TEAM_ROUTE;
    routeCopy.parentRoute = parentRoute;

    const response = await HorizonAPIClient.RequestService.Request(routeCopy);
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
  } */
}
