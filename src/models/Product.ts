export default class Product {
  id: number;

  name: string;

  createdAt: Date;

  updatedAt: Date;

  ownerID: number;

  ownerType: string;

  constructor(apiProductResponse: any) {
    this.id = apiProductResponse.id;
    this.name = apiProductResponse.name;

    this.createdAt = new Date(apiProductResponse.created_at);
    this.updatedAt = new Date(apiProductResponse.updated_at);

    this.ownerID = apiProductResponse.ownable_id;
    this.ownerType = apiProductResponse.ownable_type;
  }
}
