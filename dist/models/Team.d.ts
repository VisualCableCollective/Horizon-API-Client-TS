import { Product } from './Product';
export declare class Team {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
    constructor(apiTeamResponse: any);
}
