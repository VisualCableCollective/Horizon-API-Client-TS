import { Team } from '..';
export declare class Product {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    creatorId: number;
    creatorType: string;
    creator?: Team;
    constructor(apiProductResponse: any);
}
