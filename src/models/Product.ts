import { Team } from '..';

export class Product {
  id: number;

  name: string;

  createdAt: Date;

  updatedAt: Date;

  creatorId: number;

  creatorType: string;

  creator?: Team;

  constructor(apiProductResponse: any) {
    this.id = apiProductResponse.id;
    this.name = apiProductResponse.name;

    this.createdAt = new Date(apiProductResponse.created_at);
    this.updatedAt = new Date(apiProductResponse.updated_at);

    this.creatorId = apiProductResponse.creator_id;
    this.creatorType = apiProductResponse.creator_type;
  }
}
